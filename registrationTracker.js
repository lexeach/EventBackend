const Web3 = require("web3");
const { dataUpdater } = require("./dataUpdater");

const contractAddress = "0x7716dB181506939Ed6Ba6e35755A8668D8668D9A";
const eventSignature = "LevelsIncome(address,address,uint256,uint256)";


const MonitorLogs = async () => {
  const web3 = new Web3(
    "wss://bsc-testnet.blastapi.io/e8854780-5b4e-4a90-b994-149df5c99ce9"
  );
  const subscription = web3.eth.subscribe(
    "logs",
    {
      address: contractAddress,
      topics: [web3.utils.keccak256(eventSignature)],
    },
    (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(result.transactionHash);
      const data = result.data;
      const decodedData = web3.eth.abi.decodeLog(
        [
          {
            indexed: true,
            name: "_user",
            type: "address",
          },
          {
            indexed: true,
            name: "_referral",
            type: "address",
          },
          {
            indexed: true,
            name: "_level",
            type: "uint256",
          },
          {
            indexed: false,
            name: "_time",
            type: "uint256",
          },
        ],
        data,
        result.topics.slice(1)
      );
      console.log(decodedData);
      const Result = decodedData.result;
      dataUpdater(Result._user, Result._referral, Result._level , Result._time);
    }
  );

  subscription.on("connected", () => {
    console.log("Connected to WebSocket endpoint");
  });

  subscription.on("error", (error) => {
    console.error("Error:", error);
  });
};

module.exports = {
  MonitorLogs,
};
