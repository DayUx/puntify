import { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Layout, Row, Skeleton, Slider, Typography } from "antd";

const { Text, Link } = Typography;

const { Sider, Content } = Layout;
const Timer = forwardRef(
  ({ currentTime, endTime, onAfterChange = function () {} }, ref) => {
    const [current, setCurrent] = useState(currentTime);
    const [isDragging, setIsDragging] = useState(false);

    const sliderChange = (value) => {
      onAfterChange(endTime * (value / 100));
    };

    const formatTime = (time) => {
      if (!time) return "--:--";
      const heures = Math.floor(time / 3600);
      const minutes = Math.floor((time - heures * 3600) / 60);
      const secondes = Math.floor(time - heures * 3600 - minutes * 60);
      if (heures !== 0) {
        return `${heures}:${minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${secondes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`;
      }
      return `${minutes}:${secondes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;
    };

    return (
      <Row
        align="middle"
        style={{
          textAlign: "center",
        }}
      >
        <Col span={4} className={"current-time"}>
          <Text>{formatTime(currentTime)}</Text>
        </Col>
        <Col span={16}>
          <Slider
            tooltip={{ formatter: null }}
            onChange={sliderChange}
            value={(currentTime / endTime) * 100}
          ></Slider>
        </Col>
        <Col span={4} className={"end-time"}>
          <Text>{formatTime(endTime)}</Text>
        </Col>
      </Row>
    );
  }
);

export default Timer;
