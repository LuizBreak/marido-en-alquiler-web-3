import { LogTrail } from "../services/logTrail.service";

export default {
  methods: {
    logIt(who, what, whereWasIt, _sessionId, postOnWall) {
      const sysLogger = new LogTrail(
        who,
        what,
        whereWasIt,
        `event-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        postOnWall
      );
      try {
        const logLevel = process.env.VUE_APP_SYS_LOG_LEVEL;
        if (logLevel == "true") {
          sysLogger.add();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
