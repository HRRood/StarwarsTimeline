import { CircleLoader } from "react-spinners";

interface Props {
  isLoading: boolean;
}

function Loader({ isLoading }: Props) {
  if (!isLoading) return <></>;

  return (
    <div
      style={{
        position: "absolute",
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        background: "#000",
        opacity: 0.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircleLoader color="#f2bd08" size={50} />
    </div>
  );
}

export default Loader;
