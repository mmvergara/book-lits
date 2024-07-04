const Throbber = () => {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
};

export default Throbber;
