import { useRef, useState } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { useGetSet } from "react-use";
import {
  // BlocklyEditorMessage,
  useBlocklyInterpreter,
} from "../../commons/interpreter";
import { useBlocklyWorkspace } from "../../commons/blockly";
import {
  CUSTOM_COMMON_WHILE_TRUE,
  CUSTOM_COMMON_DO_UNTIL,
  CUSTOM_COMMON_IF,
  CUSTOM_COMMON_IF_ELSE,
} from "../../config/blockly.blocks";
import {
  // CUSTOM_CENTER_OF_CLUSTER,
  // CUSTOM_CALCULATE_CENTER_OF_CLUSTER,
  // CUSTOM_ASSIGN_CLUSTER,
  // CUSTOM_DISTANCE_BETWEEN_X_AND_Y,
  // CUSTOM_CLUSTER_OF_X,
  // CUSTOM_Y_IS_SMALLER_THAN_X,
  // CUSTOM_FOR_ALL_DATAS,
  // CUSTOM_DATA_PROCESSING,
  // CUSTOM_FOR_ALL_CLUSTERS,
  // CUSTOM_CLUSTER_PROCESSING,
  // CONSOLE_LOG,
  cluster,
  CUSTOM_KM_ADD_DATA_TO_ARRAY,
  CUSTOM_KM_DELETE_DATA_FROM_ARRAY,
  CUSTOM_KM_X_OF_DATA_IN_ARRAY,
  CUSTOM_KM_Y_OF_DATA_IN_ARRAY,
  CUSTOM_KM_LENGTH_OF_ARRAY,
  CUSTOM_KM_Y_IS_SMALLER_THAN_X,
  CUSTOM_KM_DATA_A_IS_DATA_B,
  CUSTOM_KM_DEFINE_A_IS_B,
  CUSTOM_KM_A_PLUS_B,
  CUSTOM_KM_A_POWER_B,
} from "./blocks";
import { ExecutionManager } from "../../components/ExecutionManager";
import { SimulatorRenderer } from "./SimulatorRenderer";

const toolboxBlocks = [
  // 共有のブロック
  CUSTOM_COMMON_WHILE_TRUE,
  CUSTOM_COMMON_DO_UNTIL,
  CUSTOM_COMMON_IF,
  CUSTOM_COMMON_IF_ELSE,
  // ワークスペースごとに定義したブロック
  // CUSTOM_CENTER_OF_CLUSTER,
  // CUSTOM_CALCULATE_CENTER_OF_CLUSTER,
  // CUSTOM_ASSIGN_CLUSTER,
  // CUSTOM_DISTANCE_BETWEEN_X_AND_Y,
  // CUSTOM_CLUSTER_OF_X,
  // CUSTOM_Y_IS_SMALLER_THAN_X,
  // CUSTOM_FOR_ALL_DATAS,
  // CUSTOM_DATA_PROCESSING,
  // CUSTOM_FOR_ALL_CLUSTERS,
  // CUSTOM_CLUSTER_PROCESSING,
  // CONSOLE_LOG,
  CUSTOM_KM_ADD_DATA_TO_ARRAY,
  CUSTOM_KM_DELETE_DATA_FROM_ARRAY,
  CUSTOM_KM_X_OF_DATA_IN_ARRAY,
  CUSTOM_KM_Y_OF_DATA_IN_ARRAY,
  CUSTOM_KM_LENGTH_OF_ARRAY,
  CUSTOM_KM_Y_IS_SMALLER_THAN_X,
  CUSTOM_KM_DATA_A_IS_DATA_B,
  CUSTOM_KM_DEFINE_A_IS_B,
  CUSTOM_KM_A_PLUS_B,
  CUSTOM_KM_A_POWER_B,
];

type KmeansWorkspaceState = {
  listOfClusters: cluster[];
  centerOfClusters: cluster;
};

export function KmeansWorkspace(): JSX.Element {
  const N = 100;
  const K = 3;

  const clusters: cluster[] = [];

  // for (let i = 0; i < K; i += 1) {
  //   clusters.push({
  //     datas: [],
  //     n: i,
  //   });
  // }
  // function RandomDatas(n: number): KmeansWorkspaceState {
  //   const datas: data[] = [];
  //   for (let i = 0; i < n; i += 1) {
  //     const x: number = Math.random() * N;
  //     const y: number = Math.random() * N;
  //     const c: number = Math.floor(Math.random() * K);
  //     datas.push({ x, y, n: c });
  //     clusters[c].datas.push({ x, y, n: c });
  //   }
  //   return {
  //     // listOfDatas:datas,
  //     listOfClusters: clusters,
  //     centerOfClusters: [],
  //   };
  // }

  for (let i = 0; i < K; i += 1) {
    clusters.push({
      datas: [],
      n: i,
    });
  }
  function RandomDatas(n: number): KmeansWorkspaceState {
    for (let i = 0; i < n; i += 1) {
      const x: number = Math.random() * N;
      const y: number = Math.random() * N;
      const c: number = Math.floor(Math.random() * K);
      clusters[c].datas.push({ x, y });
    }
    return {
      listOfClusters: clusters,
      centerOfClusters: { datas: [], n: K },
    };
  }

  // interpreter に渡す関数は実行開始時に決定されるため、通常の state だと最新の情報が参照できません
  // このため、反則ですが内部的に ref を用いて状態管理をしている react-use の [useGetSet](https://github.com/streamich/react-use/blob/master/docs/useGetSet.md) を用いています。
  const [getState, setState] = useGetSet(RandomDatas(N));

  /* eslint-disable no-var */
  /* eslint-disable vars-on-top */
  // javascriptGenerator により生成されたコードから呼ばれる関数を定義します
  const globalFunctions = useRef({
    // [CUSTOM_CALCULATE_CENTER_OF_CLUSTER]: () => {
    //   for (var i = 0; i < K; i += 1) {
    //     var currentState = getState();
    //     var CLUSTER_X: number[] = currentState.listOfClusters[i].datas.map(
    //       (data_) => data_.x
    //     );
    //     var CLUSTER_Y: number[] = currentState.listOfClusters[i].datas.map(
    //       (data_) => data_.y
    //     );
    //     var avgX = 0;
    //     var avgY = 0;
    //     for (
    //       var j = 0;
    //       j < currentState.listOfClusters[i].datas.length;
    //       j += 1
    //     ) {
    //       avgX += CLUSTER_X[j];
    //       avgY += CLUSTER_Y[j];
    //     }
    //     avgX /= currentState.listOfClusters[i].datas.length;
    //     avgY /= currentState.listOfClusters[i].datas.length;
    //     setState({
    //       // listOfDatas:currentState.listOfDatas,
    //       listOfClusters: currentState.listOfClusters,
    //       centerOfClusters: currentState.centerOfClusters.concat({
    //         x: avgX,
    //         y: avgY,
    //         n: i,
    //       }),
    //     });
    //   }
    // },
    // [CUSTOM_ASSIGN_CLUSTER]: (data_: data, cluster_: cluster) => {
    //   var currentState = getState();
    //   for (
    //     var i = 0;
    //     i < currentState.listOfClusters[data_.n].datas.length;
    //     i += 1
    //   ) {
    //     if (currentState.listOfClusters[data_.n].datas[i] === data_) {
    //       var newListOfClusters = currentState.listOfClusters;
    //       newListOfClusters[data_.n].datas.splice(i, 1);
    //       newListOfClusters[cluster_.n].datas.push(data_);
    //       setState({
    //         listOfClusters: newListOfClusters,
    //         centerOfClusters: currentState.centerOfClusters,
    //       });
    //       break;
    //     }
    //   }
    // },
    // [CUSTOM_CLUSTER_OF_X]: (data_: data) => {
    //   var currentState = getState();
    //   return currentState.listOfClusters[data_.n];
    // },
    // [CUSTOM_CENTER_OF_CLUSTER]: (cluster_: cluster) => {
    //   var currentState = getState();
    //   return currentState.centerOfClusters[cluster_.n];
    // },
    // [CUSTOM_Y_IS_SMALLER_THAN_X]: (number1: number, number2: number) => {
    //   return number1 > number2;
    // },
    // [CUSTOM_DISTANCE_BETWEEN_X_AND_Y]: (data1: data, data2: data) => {
    //   return Math.sqrt((data1.x - data2.x) ** 2 + (data1.y - data2.y) ** 2);
    // },
    [CUSTOM_KM_ADD_DATA_TO_ARRAY]: (a: cluster, x: number, y: number) => {
      a.datas.push({ x, y });
    },
    [CUSTOM_KM_DELETE_DATA_FROM_ARRAY]: (a: cluster, i: number) => {
      a.datas.splice(i, 1);
    },
    [CUSTOM_KM_X_OF_DATA_IN_ARRAY]: (a: cluster, i: number) => {
      return a.datas[i].x;
    },
    [CUSTOM_KM_Y_OF_DATA_IN_ARRAY]: (a: cluster, i: number) => {
      return a.datas[i].y;
    },
    [CUSTOM_KM_LENGTH_OF_ARRAY]: (a: cluster) => {
      return a.datas.length;
    },
    [CUSTOM_KM_Y_IS_SMALLER_THAN_X]: (number1: number, number2: number) => {
      return number1 > number2;
    },
    [CUSTOM_KM_DATA_A_IS_DATA_B]: (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) => {
      return x1 === x2 && y1 === y2;
    },
    // [CUSTOM_KM_DEFINE_A_IS_B]: (a: number, b: number) => {
    //   a = b;
    // },
    [CUSTOM_KM_A_PLUS_B]: (a: number, b: number) => {
      return a + b;
    },
    [CUSTOM_KM_A_POWER_B]: (a: number, b: number) => {
      return a ** b;
    },
  }).current;

  const [interval, setInterval] = useState(500);
  const { workspaceAreaRef, highlightBlock, getCode } = useBlocklyWorkspace({
    toolboxBlocks,
  });
  const interpreter = useBlocklyInterpreter({
    globalFunctions,
    executionInterval: interval,
    onStep: highlightBlock,
  });

  return (
    <Grid h="100%" templateColumns="1fr 25rem">
      <div ref={workspaceAreaRef} />
      <Box p={4}>
        <ExecutionManager
          interpreter={interpreter}
          interval={interval}
          setInterval={setInterval}
          onStart={() => {
            interpreter.start(getCode());
          }}
          onReset={() => {
            setState(RandomDatas(N));
          }}
        />
        <button
          type="button"
          onClick={() => {
            setState(RandomDatas(N));
          }}
        >
          (再配置)
        </button>
        <SimulatorRenderer clusters={getState().listOfClusters} />

        <Text>
          0x{" "}
          {getState().centerOfClusters.datas[0]
            ? getState().centerOfClusters.datas[0].x
            : 0}
        </Text>
        <Text>
          0y{" "}
          {getState().centerOfClusters.datas[0]
            ? getState().centerOfClusters.datas[0].y
            : 0}
        </Text>
        <Text>
          1x{" "}
          {getState().centerOfClusters.datas[1]
            ? getState().centerOfClusters.datas[1].x
            : 0}
        </Text>
        <Text>
          1y{" "}
          {getState().centerOfClusters.datas[1]
            ? getState().centerOfClusters.datas[1].y
            : 0}
        </Text>
        <Text>
          2x{" "}
          {getState().centerOfClusters.datas[2]
            ? getState().centerOfClusters.datas[2].x
            : 0}
        </Text>
        <Text>
          2y{" "}
          {getState().centerOfClusters.datas[2]
            ? getState().centerOfClusters.datas[2].y
            : 0}
        </Text>
      </Box>
    </Grid>
  );
}
