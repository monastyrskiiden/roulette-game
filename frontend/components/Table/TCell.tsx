import { useEffect, useRef } from 'react';
import styles from './TCell.module.css';

type TCellProps = {
  value: string;
  position: number;
  delay: number;
  loading: boolean;
};

function TCell({ value, position, delay, loading = false }: TCellProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function startAnimation() {
      if (nodeRef.current) {
        nodeRef.current.classList.add(styles[`spin${position}`]);
        nodeRef.current.innerText = 'X';
      }
    }

    function stopAnimation() {
      timeout = setTimeout(() => {
        if (nodeRef.current) {
          nodeRef.current.classList.remove(styles[`spin${position}`]);
          nodeRef.current.innerText = value;
        }
      }, delay);
    }

    if (loading) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => clearTimeout(timeout);
  }, [loading, value, delay, position]);

  return (
    <div className={styles.block}>
      <div ref={nodeRef} className={styles.spin}>
        {value}
      </div>
    </div>
  );
}

export default TCell;
