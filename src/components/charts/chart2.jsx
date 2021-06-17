import React from "react";
import { Bar as BarChart } from "react-chartjs-2";
import "./charts.styles.scss";
import "chartjs-plugin-zoom";

require("./roundbar.jsx");

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    const { topics } = this.props;
    // Get data set from props (this is just mock data)
    // var ctx = document.getElementById("canvaschart").getContext("2d");

    this.state = {
      datasets: {
        labels: topics.map((topic) => topic.title),
        colorstyle: [
          {
            backgroundColor: "#92929D",
          },
          {
            backgroundImage: "linear-gradient(#0340FF, #369AFF)",
          },
        ],
        axisX: {
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
        },
        axisY: {
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
        },
        datasets: [
          {
            label: "Number of Questions Answered",
            data: topics.map((topic) => topic.questions_answered),
            backgroundColor: "linear-gradient(#1403ff, #1C6CFF)",
            borderWidth: 2,
            legendStyle: {
              backgroundColor: "green",
            },
          },
          {
            label: "Number of Questions Full Marks",
            data: topics.map((topic) => topic.questions_answered),
            backgroundColor: "linear-gradient(#369AFF, #88C3FF)",
            borderWidth: 2,
            legendStyle: {
              backgroundImage: "red",
            },
          },
        ],
      },
    };

    this.renderGraph();
  }

  renderGraph() {
    const { topics } = this.props;
    if (document.getElementById("canvaschart") == undefined) return;
    var ctx = document.getElementById("canvaschart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#1403ff");
    gradient.addColorStop(1, "#1C6CFF");
    var gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, "#369AFF");
    gradient1.addColorStop(1, "#88C3FF");
    const newData = {
      labels: topics.map((topic) => topic.title),
      colorstyle: [
        {
          backgroundColor: "#92929D",
        },
        {
          backgroundImage: "linear-gradient(180deg, #369AFF 0%, #88C3FF 100%)",
        },
      ],
      axisX: {
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
        scrollbar: {
          enabled: true,
        },
      },
      axisY: {
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
      },
      datasets: [
        {
          label: "Number of Questions Answered",
          data: topics.map((topic) => topic.questions_answered),
          backgroundColor: gradient,
          borderColor: gradient,
          borderWidth: 2,
          legendStyle: {
            backgroundColor: gradient,
          },
        },
        {
          label: "Number of Questions Full Marks",
          data: topics.map((topic) => topic.questions_answered),
          backgroundColor: gradient1,
          borderColor: gradient1,
          borderWidth: 2,
          legendStyle: {
            backgroundImage: gradient1,
          },
        },
      ],
    };

    // var xAxisLabelMinWidth = 90;
    // var chartCanvas = document.getElementById('canvaschart');
    // var maxWidth = chartCanvas.parentElement.parentElement.clientWidth;
    // var width = Math.max(newData.labels.length * xAxisLabelMinWidth, maxWidth);

    // chartCanvas.parentElement.style.width = width +'px';

    // this.setState({ datasets: newData });
    this.state.datasets = newData;
  }

  componentDidMount() {
    //your code
    this.renderGraph();
  }

  render() {
    const { course_title, topics } = this.props;
    console.log("TOP:", topics);
    this.renderGraph();
    return (
      <div>
        <div className="chart__header-block">
          <div className="title">
            <div>{course_title}</div>
            <div>Questions Answered</div>
          </div>
          <div className="legend">
            {this.state.datasets.datasets.map(function (value, index, array) {
              let legendClassName = index < 2 ? index.toString() : "1";
              return (
                <div key={index}>
                  {value.label}{" "}
                  <span
                    className={`legend-label-color-` + legendClassName}
                  ></span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chart-wrapper">
          <div>
            <BarChart
              id="canvaschart"
              data={this.state.datasets}
              width={600}
              height={400}
              options={{
                maintainAspectRatio: false,
                cornerRadius: 30,
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: "Topic",
                        fontSize: 18,
                      },
                      ticks: {
                        fontColor: "black",
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false, //<- set this
                      },
                    },
                  ],
                  yAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: "Number of questions",
                        fontSize: 18,
                      },
                      ticks: {
                        fontColor: "black",
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false, //<- set this
                      },
                    },
                  ],
                },
                zoom: {
                  enabled: true,
                  mode: "x",
                  // Minimal zoom distance required before actually applying zoom
                  threshold: 2,
                  // On category scale, minimal zoom level before actually applying zoom
                  sensitivity: 3,
                },
                pan: {
                  enabled: true,
                  mode: "x",
                  // On category scale, factor of pan velocity
                  speed: 5,
                  // Minimal pan distance required before actually applying pan
                  threshold: 30,
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
