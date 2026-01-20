import { create } from "zustand";
import {
  combine,
  persist,
  subscribeWithSelector,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  devtools(
    // persist는 state를 localstorage에 보관
    // 두 개의 인수가 필요, 두 번째 인수는 저장될 객체 형식으로 사용
    // localstorage에 보관 할 때는 json 형식으로 보관하기 때문에 state가 아닌 actions 함수는 저장되지 않음
    // 그렇기 때문에 새로 고침하면 localstorage에 저장된 store는 삭제되지 않기 떄문에 actions 함수가 없는 상태이기 떄문에 동작이 안됨
    // 이를 방지하고자 partialize를 사용
    persist(
      // subscribeWithSelector는 특정 state를 구독하여 state 변경시 특정 행동을 함
      // useEffect랑 비슷함
      subscribeWithSelector(
        // immer는 업데이트시 불변성을 편하게 관리해줌
        // 그렇기에 count: state.count + 1 형태가 아닌 state.count += 1 형태가 가능
        immer(
          // combine은 첫 번째 인수를 기준으로 현재 store 타입을 자동으로 추론
          // 따라서 추가적인 타입 정의 불필요
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increaseOne: () => {
                set((state) => {
                  state.count += 1;
                });
              },
              decreaseOne: () => {
                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      {
        name: "countStore",
        // partialize를 사용함으로써 count값만 보관
        partialize: (store) => ({
          count: store.count,
        }),
        // createJSONStorage를 통해 localStorage 데이터를 sessionStorage에 보관
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "countStore",
    },
  ),
);

// subscribeWithSelector에서 subscribe 메서드를 통해 행동 가능
useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // Listner
    console.log(count, prevCount);

    // getState 메서드를 통해 store를 가져올 수 있음
    const store = useCountStore.getState();
    // setState 메서드를 통해 store를 업데이트 할 수 있음
    // useCountStore.setState((store) => ({ }))
  },
);

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increaseOne);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decreaseOne);
  return decrease;
};
