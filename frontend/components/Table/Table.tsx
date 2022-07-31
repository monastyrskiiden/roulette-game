import { MouseEvent, useState } from 'react';
import {
  useBalance,
  useStart,
  useRoll,
  useCashOut,
  useWindowSize,
} from '../../lib/hooks';
import { chance } from '../../utils';
import styles from './Table.module.css';
import TCell from './TCell';

function Table() {
  const balanceRes = useBalance();
  const start = useStart();
  const roll = useRoll();
  const cashOut = useCashOut();

  const [result, setResult] = useState<[string, string, string]>([
    'X',
    'X',
    'X',
  ]);

  const handleRoll = () => {
    roll.mutate(undefined, {
      onSuccess: (data) => {
        setResult(data.result);
      },
    });
  };

  const windowSize = useWindowSize();

  const handleHover = (e: MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;

    // 40% chance to disable button
    currentTarget.disabled = chance(40);

    // 50% chance to move
    const chanceToMove = chance(50);
    const left = Number(currentTarget.style.left.replace('px', ''));
    const top = Number(currentTarget.style.top.replace('px', ''));
    // Window boundaries
    const leftBoundary = 100;
    const topBoundary = 100;
    const rightBoundary = windowSize.width - 100;
    const bottomBoundary = windowSize.height - 100;

    if (chanceToMove) {
      currentTarget.style.position = 'absolute';

      // Move horizontaly
      currentTarget.style.left =
        Math.random() < 0.5
          ? Math.max(leftBoundary, left - 300) + 'px'
          : Math.min(rightBoundary, left + 300) + 'px';

      // Move verticaly
      currentTarget.style.top =
        Math.random() < 0.5
          ? Math.max(topBoundary, top - 300) + 'px'
          : Math.min(bottomBoundary, top + 300) + 'px';
    }
  };

  return (
    <>
      <div className={styles.table}>
        <div className={styles.row}>
          {result.map((item, i) => (
            <TCell
              key={i}
              value={item}
              position={i + 1}
              delay={(i + 1) * 1000}
              loading={roll.isLoading}
            />
          ))}
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={() => start.mutate()}>
          Start
        </button>
        <button
          className={styles.btn}
          disabled={balanceRes.data?.balance === 0 || roll.isLoading}
          onClick={handleRoll}
        >
          Roll
        </button>
        <button
          className={styles.btn}
          disabled={balanceRes.data?.balance === 0 || roll.isLoading}
          onClick={() => cashOut.mutate()}
          onMouseEnter={handleHover}
        >
          Cash out
        </button>
      </div>
    </>
  );
}

export default Table;
