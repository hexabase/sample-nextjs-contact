const IconCheck = ({ width = 20, height = 20, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="-4 0 32 32"
      fill="currentColor"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19.375 5.063l-9.5 13.625-6.563-4.875-3.313 4.594 11.188 8.531 12.813-18.375z"
      ></path>
    </svg>
  );
};

export default IconCheck;
