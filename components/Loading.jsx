import Loader from "react-loader-spinner";

export default function Loading () {
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={75}
        width={75}
        timeout={30000} //30 secs
        style={{"textAlign":"center", "marginTop":"100px"}}
      />
    );
}