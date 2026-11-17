"""Build the sourced competitor workbook; optional dependency location via --library-dir."""
import argparse, datetime, json, pathlib, re, sys, zipfile

parser=argparse.ArgumentParser()
parser.add_argument('--library-dir')
args=parser.parse_args()
if args.library_dir: sys.path.insert(0,str(pathlib.Path(args.library_dir).resolve()))
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.utils import get_column_letter

root=pathlib.Path(__file__).resolve().parent
data=json.loads((root/'DR-Colombia-Home-Services-2026-11-17-data.json').read_text(encoding='utf-8'))
output=root/'DR-Colombia-Home-Services-Comparison-2026-11-17.xlsx'
asof=datetime.date.fromisoformat(data['as_of'])
NAVY='20283E'; ORANGE='FD5631'; BLUE='175A9B'; PALE='EDF3F8'; GRAY='586477'; WHITE='FFFFFF'
wb=Workbook(); wb.remove(wb.active)
source_rows={row[0]:6+i for i,row in enumerate(data['sources'])}
company_by_name={c['name']:c for c in data['companies']}

def source_link(cell, refs):
    first=re.search(r'S\d+',str(refs))
    if first:
        cell.hyperlink=f"#'Sources'!A{source_rows[first.group()]}"
        cell.font=Font(name='Calibri',size=10,color=BLUE,underline='single')

def table_sheet(name,title,subtitle,headers,rows,widths,row_height=112):
    ws=wb.create_sheet(name); n=len(headers); end=get_column_letter(n)
    ws.sheet_view.showGridLines=False; ws.sheet_view.zoomScale=85
    ws.merge_cells(f'A1:{end}1'); ws['A1']=title; ws['A1'].font=Font(name='Calibri',size=21,bold=True,color=NAVY); ws.row_dimensions[1].height=36
    ws.merge_cells(f'A2:{end}2'); ws['A2']=f'Researched {asof:%d %B %Y} | Public sources; local availability and checkout not tested.'; ws['A2'].font=Font(name='Calibri',size=10,color=GRAY); ws.row_dimensions[2].height=22
    ws.merge_cells(f'A3:{end}3');ws['A3']=subtitle;ws['A3'].font=Font(name='Calibri',size=11,color=GRAY);ws['A3'].alignment=Alignment(wrap_text=True,vertical='center');ws.row_dimensions[3].height=32
    ws.row_dimensions[4].height=8
    for i,header in enumerate(headers,1):
        cell=ws.cell(5,i,header);cell.font=Font(name='Calibri',bold=True,color=WHITE,size=11);cell.fill=PatternFill('solid',fgColor=NAVY);cell.alignment=Alignment(wrap_text=True,vertical='center')
    ws.row_dimensions[5].height=35
    for r,row in enumerate(rows,6):
        for col,value in enumerate(row,1):
            cell=ws.cell(r,col,value);cell.font=Font(name='Calibri',size=11,color=NAVY);cell.alignment=Alignment(wrap_text=True,vertical='top');cell.border=Border(bottom=Side(style='hair',color='DCE3EA'))
            if r%2==0: cell.fill=PatternFill('solid',fgColor=PALE)
            if isinstance(value,str) and value.startswith('https://'):
                cell.hyperlink=value;cell.font=Font(name='Calibri',size=10,color=BLUE,underline='single')
            if headers[col-1]=='Sources': source_link(cell,value)
        ws.row_dimensions[r].height=row_height
    for i,width in enumerate(widths,1):ws.column_dimensions[get_column_letter(i)].width=width
    tab=Table(displayName=re.sub(r'\W','',name)+'Table',ref=f'A5:{end}{5+len(rows)}');tab.tableStyleInfo=TableStyleInfo(name='TableStyleMedium2',showRowStripes=True);ws.add_table(tab)
    ws.freeze_panes='C6';ws.sheet_properties.pageSetUpPr.fitToPage=True
    ws.page_setup.orientation='landscape';ws.page_setup.paperSize=ws.PAPERSIZE_A3;ws.page_setup.fitToWidth=1;ws.page_setup.fitToHeight=0
    ws.print_title_rows='1:5';ws.print_area=f'A1:{end}{ws.max_row}';ws.sheet_properties.tabColor=ORANGE
    ws.oddFooter.center.text='Target Innovations | Public-source research | &P / &N';ws.oddFooter.center.size=9
    return ws

overview=wb.create_sheet('Read me');overview.sheet_view.showGridLines=False
for col in range(1,9):overview.column_dimensions[get_column_letter(col)].width=15
def block(row,last,text,size=11,bold=False,color=NAVY,bg=None):
    overview.merge_cells(start_row=row,start_column=1,end_row=last,end_column=8)
    cell=overview.cell(row,1,text);cell.font=Font(name='Calibri',size=size,bold=bold,color=color);cell.alignment=Alignment(wrap_text=True,vertical='center')
    if bg:
        for rr in range(row,last+1):
            for cc in range(1,9):overview.cell(rr,cc).fill=PatternFill('solid',fgColor=bg)
    for rr in range(row,last+1):overview.row_dimensions[rr].height=23
block(1,2,'HOME SERVICES\nDominican Republic + Colombia',22,True,WHITE,NAVY)
overview.row_dimensions[1].height=32;overview.row_dimensions[2].height=32
block(3,3,f'Competitor and business-model comparison | {asof:%d %B %Y}',11,False,GRAY)
metrics=[('10','core comparisons'),('6','watchlist candidates'),('2','explicit prelaunch offers'),(str(len(data['sources'])),'source records')]
for i,(number,label) in enumerate(metrics):
    a=1+i*2;overview.merge_cells(start_row=5,start_column=a,end_row=5,end_column=a+1);overview.cell(5,a,number).font=Font(name='Calibri',size=24,bold=True,color=ORANGE)
    overview.merge_cells(start_row=6,start_column=a,end_row=7,end_column=a+1);overview.cell(6,a,label).font=Font(name='Calibri',size=11,color=GRAY);overview.cell(6,a).alignment=Alignment(wrap_text=True,vertical='top')
overview.row_dimensions[5].height=32
block(9,10,'Yes — comparable services exist in both markets. The closest public matches span paid proposals, provider subscriptions, completion commissions and managed service delivery.',14,True)
block(12,13,'Dominican Republic: prioritize Servicio.do, MANO and Reno RD for direct-model comparison. SuperVecino offers a residential niche; Corotos is an adjacent discovery channel. MANO and Servi explicitly show waitlists. [S01–S10]',11)
block(15,16,'Colombia: Solverio provides the clearest published proposal-fee benchmark. AYDA is a transactional comparator. Hogarú and Homecenter show more operationally involved service models. [S11–S19]',11)
block(18,19,'Recommendation for MEA (analysis): validate a narrow Santo Domingo pilot before selecting monetization. Compare lead quality, response and completed jobs; test a simple fee only after showing provider value. No competitor has demonstrated market size or profitability in this research.',11,True)
block(21,21,'OPEN A WORKSHEET',11,True,WHITE,NAVY)
nav=[('Competitors','Country, services, coverage, evidence, trust claims and contacts'),('Monetization','Who pays, when revenue occurs, payment handling and trade-offs'),('Pricing','Published amounts, units and currencies; blanks mean unverified'),('Model tradeoffs','Operating implications of each commercial model — analyst assessment'),('MEA pilot','Suggested priorities and questions for the Santo Domingo pilot'),('Watchlist','Six candidates needing stronger current verification'),('Sources','Clickable original URLs, retrieval limitations and research date')]
for r,(sheet,label) in enumerate(nav,22):
    overview.merge_cells(start_row=r,start_column=1,end_row=r,end_column=2);cell=overview.cell(r,1,sheet);cell.hyperlink=f"#'{sheet}'!A1";cell.font=Font(name='Calibri',size=11,color=BLUE,underline='single',bold=True)
    overview.merge_cells(start_row=r,start_column=3,end_row=r,end_column=8);overview.cell(r,3,label).font=Font(name='Calibri',size=10,color=NAVY);overview.row_dimensions[r].height=23
block(30,30,'HOW TO INTERPRET THE EVIDENCE',11,True,WHITE,NAVY)
block(31,33,'Public offer verified means a website, tariff or developer listing was accessible; it does not prove local supply, actual bookings, revenue or company scale. Verification/guarantee statements are provider claims. No company was contacted and no paid booking was made. Failed access does not establish closure.',11)
block(35,37,'Prices retain their original currency and charge unit. A diagnostic visit, a four-hour retail service, a monthly listing and a professional proposal fee are different products. No currency conversion or Dominican price recommendation is implied. Check the linked current terms and checkout before relying on a tariff.',11)
block(39,40,'MEA baseline: development-stage project with profiles, projects, quotes, chat and notifications; commercial fees remain undecided and payment writes are disabled. Pilot recommendations are proposals, not approved implementation. Local baseline: docs/HANDOFF.md and the Santo Domingo pilot plan.',10,False,GRAY)
overview.freeze_panes='A9';overview.print_options.horizontalCentered=True;overview.page_setup.orientation='portrait';overview.page_setup.paperSize=overview.PAPERSIZE_A4;overview.sheet_properties.pageSetUpPr.fitToPage=True;overview.page_setup.fitToWidth=1;overview.page_setup.fitToHeight=1;overview.print_area='A1:H40';overview.sheet_properties.tabColor=NAVY

companies=data['companies']
table_sheet('Competitors','Who competes with MEA?','Filter by country and relationship. Coverage and checks are published claims; status distinguishes public offers and waitlists.',
 ['Company','Country','Relationship','Public evidence / stage','Stated areas','Services','Customer journey','Trust / quality claim','Business contact','Website','Sources'],
 [[c[k] for k in ['name','country','relationship','status','areas','services','journey','trust','contact','url']]+['; '.join(c['sources'])] for c in companies],
 [25,23,26,31,40,37,43,43,34,34,20],130)

table_sheet('Monetization','How each business makes money','Revenue facts are sourced; strengths, weaknesses and MEA lessons are analyst assessments. Unknown rates remain unknown.',
 ['Company','Business model','Who pays','Charge trigger','Public price / tariff','Payment handling','Strength — analysis','Weakness — analysis','MEA lesson — analysis','Caveat / follow-up','Sources'],
 [[c[k] for k in ['name','model','payer','trigger','pricing','payments','strength','weakness','lesson','caveat']]+['; '.join(c['sources'])] for c in companies],
 [25,36,35,34,47,45,37,39,40,48,20],155)

prices=[]
def price(company,item,payer,unit,currency,low=None,high=None,pct=None,status='Published',conditions='',sources=''):
    prices.append([company,item,payer,unit,currency,low,high,pct,status,conditions,sources])
for plan,amount in [('Start',0),('Basic',9.99),('Launch',19.99),('Plus',49.99),('Grow',99.99),('Max',149.99)]:
    price('Servicio.do',plan,'Professional','Monthly platform plan','USD',amount,amount,conditions='Commission remains additional; allowances vary.',sources='S02')
price('Servicio.do','Enterprise','Professional','Monthly platform plan','USD',status='By agreement',conditions='No public amount.',sources='S02')
price('Servicio.do','Completion commission','Professional','Per confirmed completed job','USD',pct=.10,conditions='Applies across plans, on accepted quote; see separate cap.',sources='S02')
price('Servicio.do','Commission cap','Professional','Maximum commission per completed job','USD',100,100,conditions='A cap on platform fee, not service price.',sources='S02')
price('Solverio','Proposal submission','Independent / company','Each submitted proposal','COP',1500,2500,conditions='Charged even if not selected. Refund on customer cancellation/no winner, not competitor win.',sources='S12')
price('Solverio','Independent job commission','Independent professional','Commission on service','COP',pct=0,conditions='Proposal submission still costs money.',sources='S12')
price('Solverio','Company winner fee','Company with NIT','On winning proposal','COP',pct=.03,conditions='In addition to proposal fee.',sources='S12')
price('Solverio','Minimum credit recharge','Professional','Prepaid balance top-up','COP',15000,15000,conditions='Balance purchase, not a service or single lead fee.',sources='S12')
price('Solverio','Welcome balance','Verified professional','Promotional credit','COP',20000,20000,status='Published incentive',conditions='Conditional on verification; not cash income.',sources='S12')
price('AYDA','Electrician quotation visit','Customer','Initial quote / diagnostic visit','COP',24900,None,conditions='Starting amount; repair/materials separately scoped and quoted.',sources='S14')
price('AYDA','Provider service commission','Professional','Completed service percentage','COP',status='Percentage not disclosed',conditions='FAQ confirms a percentage, without a rate.',sources='S13')
price('Homecenter','Handyman SKU 310473','Customer','Four-hour service package','COP',86900,86900,conditions='Retail labour price; materials excluded. Address and product conditions apply.',sources='S19')
price('MANO','Opportunity-unlock credits','Professional','Selected job access','Not disclosed',status='Tariff not verified',conditions='Prelaunch waitlist; credit mechanism advertised.',sources='S04')
price('Reno RD','Category job commission','Professional','Confirmed job','Not disclosed',status='Rate not public',conditions='Rate disclosed in provider interface; first three jobs free per agreement.',sources='S06')
price('SuperVecino RD','Provider plan','Business','Recurring directory plan','Not disclosed',status='Tariff not verified',conditions='One-month paid-plan trial advertised; recurring amount not retrieved.',sources='S07')
price('Corotos','Seller plans / boosts','Advertiser','Subscription or promotion','Not verified',status='Comparable rate not verified',conditions='Contact seller team for current service-category offer.',sources='S08; S09')
price('Hogarú','Cleaning reservation','Customer','Booked visit / recurrence','COP',status='Current tariff not verified',conditions='Format and schedule affect quote; historical media prices excluded.',sources='S17; S18')
price('Servi (servird.do)','Planned offering','Not disclosed','Not disclosed','Not disclosed',status='No tariff verified',conditions='Prelaunch, no paid booking tested.',sources='S10')
ws=table_sheet('Pricing','Published prices — keep the units separate','Blank amounts are unknown, not zero. Percentage rows use the % column. No USD/COP/DOP conversion is applied.',
 ['Company','Item','Who pays','Charge unit','Currency','Amount / minimum','Maximum','Commission %','Evidence status','Conditions / interpretation','Sources'],prices,[25,32,28,37,19,19,17,18,29,65,20],85)
for row in ws.iter_rows(min_row=6):
    for col in (6,7):row[col-1].number_format='#,##0.00'
    row[7].number_format='0.0%'

tradeoffs=[
 ['Lead / proposal fee','MANO; Solverio','Opportunity unlock or proposal submission','Early revenue without collecting the job payment.','Provider may pay without winning; requires qualified requests, fair refunds and low spam.','Moderate','Credit ledger, fee disclosure, purchase idempotency, refund rules and support.','Strong pilot candidate after proving lead quality; fee and charge trigger still require validation.'],
 ['Provider listing subscription','Corotos; SuperVecino','Recurring visibility/access plan','Predictable revenue and simple collection.','Hard to sell without audience, density and demonstrable provider ROI.','Low–moderate','Entitlements, renewal/cancellation, listings and provider reporting.','Consider after repeat demand; avoid promising leads from an unproven audience.'],
 ['Completed-job commission','Servicio.do; Reno RD; AYDA','Confirmed/completed work; exact trigger differs','Revenue can align with an outcome or job value.','Cash/off-platform transactions complicate reconciliation, collection and dispute resolution.','High','Completion evidence, fee reconciliation, payment/refund/dispute design and operations.','Keep as an alternative; define what event creates the charge before building payments.'],
 ['Managed service','Hogarú','Booking/recurring service delivery','More control over service consistency and recurring demand.','Staffing, replacements and day-to-day fulfillment create a different operating business.','High; operational','Scheduling, staffing, quality controls, support and local employment/contracting decisions.','Borrow service-quality practices without assuming this operating model.'],
 ['Retail service package','Homecenter','Purchase a defined service SKU','Clear scope and visible customer price; potential product/service cross-selling.','Materials, site conditions and extra work can exceed the package definition.','Moderate–high','Service catalogue, scope exclusions, scheduling, checkout and exception handling.','Standardize frequent small jobs once pilot data reveals repeatable scopes.']
]
table_sheet('Model tradeoffs','Commercial models — practical trade-offs','This worksheet is original analysis, not a claim about competitors’ internal margins, contracts or profitability.',
 ['Model','Examples','Revenue event','Advantages','Disadvantages','Relative effort — analysis','Capabilities needed','Fit for MEA — proposal'],tradeoffs,[29,34,40,48,58,26,58,60],125)

actions=[
 ['1','Choose a narrow pilot','Start with a small Santo Domingo area or residential cluster and a few high-frequency trades.','Residential distribution is a possible acquisition channel, not proof of demand.','Customer interviews, provider availability and response-time baseline.','S07; local MEA pilot plan'],
 ['2','Validate supply and trust','Manually approve initial providers and define what a verified badge actually means.','Separate identity/contact checks from trade competence and job quality.','Documented review process, completed-job reviews and moderation ownership.','S04; S11; S13; S30'],
 ['3','Prove demand before charging','Use the pilot to measure qualified requests and actual provider wins.','App existence, testimonials and national coverage claims do not establish useful local supply.','Qualified requests, response rate, completed jobs, repeat use and support load.','S01; S04; S10; analyst recommendation'],
 ['4','Limit competition per request','Test a small shortlist and measure the effect on customer choice and provider responsiveness.','Several nearby models use constrained matching; the appropriate limit must be tested locally.','Reliable matching and a clear definition of who receives or can buy a lead.','S03; S04'],
 ['5','Choose the charge event','Compare paid proposals, contact release and completed-job commission before implementation.','They charge for different outcomes and allocate risk differently.','Explicit fee disclosure, a refundable-event policy and transaction ledger.','S06; S12; S13'],
 ['6','Keep cash/payment collection explicit','If service payment is direct, design how a platform fee will be paid and reconciled.','Avoid assuming a job-completion button proves cash receipt or a collectible fee.','Billing responsibilities, fee disputes, reconciliation and service-payment boundaries.','S02; S06; S11'],
 ['7','Improve only the required app flows','Build on existing projects, quotes, authenticated chat and notifications. Scope remaining moderation, deletion and reliability work.','Credits, contact gating, payment processing and automated refunds are additional development.','Approve a product model and acceptance criteria before implementing commercial charges.','Local docs/HANDOFF.md; docs/plans/Santo-Domingo-Pilot-Project-Plan-2026-11-16.md']
]
table_sheet('MEA pilot','What MEA can learn — Santo Domingo pilot','Recommendations only. No platform tariff, payment provider, launch date or business-model change is approved by this workbook.',
 ['Order','Focus','Suggested action','Reasoning / constraint','What to validate','Evidence / baseline'],actions,[12,32,65,63,65,40],120)

table_sheet('Watchlist','Candidates requiring stronger verification','A failed fetch does not mean a company has closed. Historical marketing or a public landing page does not prove current service fulfillment.',
 ['Company','Country','Evidence status','What was observed','Next verification step','Website','Sources','Interpretation limit'],data['watchlist'],[25,24,42,65,62,38,22,57],135)

source_data=[row+[asof] for row in data['sources']]
ws=table_sheet('Sources','Sources and research trail','Primary websites, terms, tariffs and developer listings. Retrieval status records incomplete, dated and inaccessible material explicitly.',
 ['ID','Company','Source / page','Original URL','Source type','Supports / limitation','Retrieval status','Research date'],source_data,[11,27,38,85,34,67,46,21],85)
ws.freeze_panes='C6'
for row in ws.iter_rows(min_row=6):row[-1].number_format='dd mmm yyyy'
wb.properties.creator='Target Innovations';wb.properties.title=data['title'];wb.properties.subject='Public-source competitor and business-model comparison';wb.properties.description='Researched 17 November 2026. Primary-source facts separated from analyst recommendations and uncertain operations.'
wb.active=0;wb.save(output)

# Check the delivered artifact, source references, counts, numeric semantics and links.
check=load_workbook(output)
assert len(check.sheetnames)==8 and check['Competitors'].max_row==15 and check['Sources'].max_row==38
assert len(companies)==10 and len(data['watchlist'])==6 and len(data['sources'])==33
known=set(source_rows)
for ws in check:
    for row in ws:
        for cell in row:
            if cell.data_type=='f':raise AssertionError('Unexpected formula')
            if isinstance(cell.value,str):
                for source in re.findall(r'\bS\d{2}\b',cell.value):assert source in known,source
for i,row in enumerate(prices,6):
    for col in (6,7,8):assert check['Pricing'].cell(i,col).value is None or isinstance(check['Pricing'].cell(i,col).value,(int,float))
assert check['Pricing']['H13'].value==.10
with zipfile.ZipFile(output) as z:assert z.testzip() is None
print(json.dumps({'workbook':str(output),'sheets':check.sheetnames,'core_companies':10,'watchlist':6,'sources':33,'pricing_rows':len(prices),'validated':True},ensure_ascii=False))
