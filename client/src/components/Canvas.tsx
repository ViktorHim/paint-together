import cls from "../styles/canvas.module.scss";

export const Canvas = () => {
  return (
    <div className={cls.canvas}>
      <canvas height={600} width={900} />
    </div>
  );
};
