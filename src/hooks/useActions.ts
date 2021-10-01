import { ActionCreatorsMapObject, bindActionCreators } from "redux";
import { useMemo } from "react";
import {useAppDispatch} from "./storeHooks";

// создаем hook, который связывает все commonActions creators с диспатчем
// нам больше не понядобиться использование диспатча в комоненте, просто будем вызывать функцию
export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [dispatch, actions])
}