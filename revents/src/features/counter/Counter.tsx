import { useAppDispatch, useAppSelector } from "../../lib/stores/store"

export default function Counter() {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    const handleDecrement = () => {
        dispatch({ type: 'counter/decrement' });
    }

    const handleIncrement = () => {
        dispatch({ type: 'counter/increment' });
    }

    const handleAddFive = () => {
        dispatch({ type: 'counter/incrementByAmount', payload: 5 });
    }

    return (
        <div className="card bg-base-100 shadow-xl flex flex-col">
        <div className="stats text-center">
            <div className="stat">
            <div className="stat-title text-xl">Counter</div>
            <div className="stat-value text-7xl">{count}</div>
            </div>
        </div>
        <div className="join">
            <button onClick={() => handleDecrement()} className="btn btn-error btn-outline join-item flex-1">Decrement</button>
            <button onClick={() => handleIncrement()} className="btn btn-success btn-outline join-item flex-1">Increment</button>
            <button onClick={() => handleAddFive()} className="btn btn-info success btn-outline join-item flex-1">Add 5</button>
        </div>
        </div>
    )
}