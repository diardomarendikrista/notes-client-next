const initialState = {
  isLogin: false,
  formType: "login",
  profile: {},
  loading: true,
  error: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  if (type === "isLogin/setIsLogin") return { ...state, isLogin: payload };
  if (type === "formType/setFormType") return { ...state, formType: payload };
  if (type === "profile/setProfile") return { ...state, profile: payload };
  if (type === "loading/setLoading") return { ...state, loading: payload };
  if (type === "error/setError") return { ...state, error: payload };
  return state;
}
