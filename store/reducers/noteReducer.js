const initialState = {
  notes: [],
  note: {},
  originPage: "",
  loading: false,
  error: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  if (type === "notes/setNotes") return { ...state, notes: payload };
  if (type === "note/setNote") return { ...state, note: payload };
  if (type === "originPage/setOriginPage") return { ...state, originPage: payload };
  if (type === "loading/setLoading") return { ...state, loading: payload };
  if (type === "error/setError") return { ...state, error: payload };
  return state;
}
