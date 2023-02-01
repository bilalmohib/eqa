import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = (res: any) => res.json();
const dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/single-event-overlay-data.json"
).then(jsonify);
const schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/single-event-overlay-schema.json"
).then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "GRADE COMPARISON"
  },
  subcaption: {
    text: "Grade comparison of students"
  },
  yaxis: [
    {
      plot: "Grade",
      format: {
        suffix: "%"
      },
      title: "Grade"
    }
  ],
  xaxis: {
    plot: "Time",
    timemarker: [
      {
        start: "Mar-1980",
        label: "US inflation peaked at 14.8%.",
        timeformat: "%b-%Y",
        style: {
          marker: {
            fill: "#D0D6F4"
          }
        }
      },
      {
        start: "May-1981",
        label:
          "To control inflation, the Fed started {br} raising interest rates to over {br} 20%.",
        timeformat: "%b-%Y"
      },
      {
        start: "Jun-1983",
        label:
          "By proactive actions of Mr.Volcker, {br} the inflation falls to 2.4% {br} from the peak of over 14% {br} just three years ago.",
        timeformat: "%b-%Y",
        style: {
          marker: {
            fill: "#D0D6F4"
          }
        }
      },
      {
        start: "Oct-1987",
        label:
          "The Dow Jones Industrial Average lost {br} about 30% of it’s value.",
        timeformat: "%b-%Y",
        style: {
          marker: {
            fill: "#FBEFCC"
          }
        }
      },
      {
        start: "Jan-1989",
        label: "George H.W. Bush becomes {br} the 41st president of US!",
        timeformat: "%b-%Y"
      },
      {
        start: "Aug-1990",
        label:
          "The oil prices spiked to $35 {br} per barrel from $15 per barrel {br} because of the Gulf War.",
        timeformat: "%b-%Y"
      },
      {
        start: "Dec-1996",
        label:
          'Alan Greenspan warns of the dangers {br} of "irrational exuberance" in financial markets, {br} an admonition that goes unheeded',
        timeformat: "%b-%Y"
      },
      {
        start: "Sep-2008",
        label: "Lehman Brothers collapsed!",
        timeformat: "%b-%Y"
      },
      {
        start: "Mar-2009",
        label:
          "The net worth of US households {br} stood at a trough of $55 trillion.",
        timeformat: "%b-%Y",
        style: {
          marker: {
            fill: "#FBEFCC"
          }
        }
      },
      {
        start: "Oct-2009",
        label: "Unemployment rate peaked {br} in given times to 10%.",
        timeformat: "%b-%Y"
      }
    ]
  }
};

class Chart extends React.Component {
  constructor(
    props: Readonly<{
      timeseriesDs: {
        type: string;
        renderAt: string;
        width: string;
        height: string;
        dataSource: {
          chart: {};
          caption: {
            text: string;
          };
          subcaption: {
            text: string;
          };
          yaxis: {
            plot: string;
            format: {
              suffix: string;
            };
            title: string;
          }[];
          xaxis: {
            plot: string;
            timemarker: {
              start: string;
              label: string;
              timeformat: string;
              style: {
                marker: {
                  fill: string;
                };
              };
            }[];
          };
        };
      };
    }>
  ) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "100%",
        height: "600",
        dataSource
      }
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({},
        // @ts-ignore 
        this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  render() {
    return (
      <div>
        {
          // @ts-ignore
          this.state.timeseriesDs.dataSource.data ? (
            <ReactFC
              {
              // @ts-ignore
              ...this.state.timeseriesDs
              }
            />
          ) : (
            "loading"
          )}
      </div>
    );
  }
}
export default Chart;