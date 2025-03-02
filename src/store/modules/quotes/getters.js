export default {
  quotes(state) {
    return state.quotes;
  },
  quote(state) {
    return state.quote;
  },
  hasQuotes(state) {
    return state.quotes && state.quotes.length > 0;
  },
};
