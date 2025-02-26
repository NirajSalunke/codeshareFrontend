import Spline from "@splinetool/react-spline";
const Robot = () => {
  return (
    <main className=" h-[108vh] w-screen">
      <Spline
        renderOnDemand={true}
        scene="https://prod.spline.design/GpYe3ew1vnNP2Fyl/scene.splinecode"
      />
    </main>
  );
};

export default Robot;
