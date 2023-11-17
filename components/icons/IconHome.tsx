const IconHome = ({ width = 20, height = 20, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <g>
        <polygon
          fill="currentColor"
          points="434.162,293.382 434.162,493.862 308.321,493.862 308.321,368.583 203.682,368.583 203.682,493.862 
		77.841,493.862 77.841,293.382 256.002,153.862 	"
        />
        <polygon
          fill="current"
          points="0,242.682 256,38.93 512,242.682 482.21,285.764 256,105.722 29.79,285.764 	"
        />
        <polygon
          fill="current"
          points="439.853,18.138 439.853,148.538 376.573,98.138 376.573,18.138 	"
        />
      </g>
    </svg>
  );
};

export default IconHome;
