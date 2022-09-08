import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  value: number;
  actulValue: number;
  label?: string;
  color?: string;
}

const ANIMATION_TIME = 500;
const FRAMES = 50;

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  color,
  actulValue,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const interval = useRef<any>(null);
  const router = useRouter();
  useEffect(() => {
    const plus = Math.round(actulValue / FRAMES);
    const intervalTime = ANIMATION_TIME / FRAMES;
    interval.current = setInterval(() => {
      setAnimatedValue((curr) => {
        if (curr + plus >= actulValue) {
          clearInterval(interval.current);
          return actulValue;
        }
        return curr + plus;
      });
    }, intervalTime);
    return () => clearInterval(interval.current);
  }, [router]);
  return (
    <div className={styles.box}>
      {label && <h5>{label}</h5>}
      <div className={styles.row}>
        <div className={styles.line}>
          <div
            className={styles.progress}
            style={{ width: `${value}%`, backgroundColor: color }}
          />
        </div>
        {actulValue && <p>{animatedValue}</p>}
      </div>
    </div>
  );
};

export default ProgressBar;
