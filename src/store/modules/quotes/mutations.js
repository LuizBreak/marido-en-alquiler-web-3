export default {
  SET_QUOTES(state, quotes) {
    state.quotes = [];
    for (const x of quotes) {
      state.quotes.push(x);
    }
  },
  SET_QUOTE(state, quote) {
    state.quote = quote;
  },
  ADD_NEW_QUOTE(state, quote) {
    state.quotes.push(quote);
  },
  DELETE_QUOTE(state, quote) {
    let index = state.quotes.indexOf(quote);
    if (index > -1) {
      state.quotes.splice(index, 1);
    }
  },
  UPDATE_QUOTE(state, quote) {
    state.quotes[quote.id] = quote;
  },
};
