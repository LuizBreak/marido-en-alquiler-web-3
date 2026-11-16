import { apiSvc } from "./api.service";

// Public forms create a stored support request. The backend chooses the mailbox;
// browsers cannot choose arbitrary email recipients or submit an HTML email.
export const EmailService = {
  async send(payload) {
    const response = await apiSvc.post("contactus", {
      firstName: String(payload.name || "Visitante").slice(0, 50),
      email: payload.email,
      phone: String(payload.mobile || "").slice(0, 15),
      MessageType: "website",
      message: String(payload.message || payload.messageBody || "")
        .replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 500),
    });
    return response.data.data;
  },
  subscribe(subscriberEmail) {
    return this.send({ name: "Solicitud de suscripción", email: subscriberEmail,
      message: "Solicitud de suscripción al boletín. Requiere gestión por el equipo; no se ha añadido automáticamente a una lista." });
  },
  sendToContactUs(payload) {
    return this.send(payload);
  },
};
