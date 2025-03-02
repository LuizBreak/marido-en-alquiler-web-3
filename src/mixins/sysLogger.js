import { LogTrail } from "../services/logTrail.service";

export default {
  methods: {
    logIt(who, what, whereWasIt, sessionId, postOnWall) {
      const sysLogger = new LogTrail(
        who,
        what,
        whereWasIt,
        sessionId,
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
