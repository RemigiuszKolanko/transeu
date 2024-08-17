import { createServer } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    return createServer({
        environment,

        routes() {
            this.namespace = "api";

            this.get("/currencies", (schema, request) => {
                let filter = request.queryParams.filter;

                let currencies = [
                    { symbol: "BTC", name: "Bitcoin" },
                    { symbol: "ETH", name: "Ethereum" },
                    { symbol: "LTC", name: "Litecoin" },
                    { symbol: "ADA", name: "Cardano" },
                ];

                if (filter) {
                    return currencies.filter((currency) =>
                        currency.name.toLowerCase().includes(filter.toLowerCase())
                    );
                }

                return currencies;
            });

            this.get("/currencies/:symbol", (schema, request) => {
                let symbol = request.params.symbol.toUpperCase();

                let currenciesDetails = [
                    { symbol: "BTC", name: "Bitcoin", rate: 116888, icon_url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
                    { symbol: "ETH", name: "Ethereum", rate: 7117, icon_url: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
                    { symbol: "LTC", name: "Litecoin", rate: 291, icon_url: "https://cryptologos.cc/logos/litecoin-ltc-logo.png" },
                    { symbol: "ADA", name: "Cardano", rate: 1.01, icon_url: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
                ];
                return currenciesDetails.find((currency) => currency.symbol === symbol);
            });
        },
    });
}