import moment from "moment";

export default {
  methods: {
    moment: function () {
      return moment();
    },
    date(date, format) {
      // console.log("moment.process dt", date);
      return moment(date).format(format || "MMMM Do YYYY, h:mm:ss a");
    },
  },
};
