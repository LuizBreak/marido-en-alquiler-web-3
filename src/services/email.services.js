export const EmailService = {
  // This calls triggers the plain-Email-Mailer api call
  async send(payload) {
    // console.log("send(payload)", payload);
    try {
      const resp = await fetch(process.env.VUE_APP_EMAIL_SVC_URL + "/mailer", {
        body: JSON.stringify({
          subject: payload.subject || "Marido-en-alquiler: Notificacion",
          name: payload.name,
          email: payload.email,
          mobile: payload.mobile,
          body: payload.messageBody,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (!resp.ok) {
        console.log(resp);
        return false;
      } else {
        console.log(resp);
        return resp;
      }
    } catch (e) {
      this.failed = true;
      console.log(e);
    }
  },
  async subscribe(subscriberEmail) {
    let response = await fetch(
      process.env.VUE_APP_EMAIL_SVC_URL + "/subscribe",
      {
        method: "POST",
        body: JSON.stringify({ email: subscriberEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log("email subscribe response: ", json);
  },
  async sendToContactUs(payload) {
    try {
      const resp = await fetch(process.env.VUE_APP_EMAIL_SVC_URL + "/contact", {
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          mobile: payload.mobile,
          message: payload.message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (!resp.ok) {
        console.log(resp);
        return false;
      } else {
        console.log(resp);
        return resp;
      }
    } catch (e) {
      this.failed = true;
      console.log(e);
    }
  },
};
