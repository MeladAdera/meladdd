function Sqr({ index, sqrs, setSqrs, go, setGo }) {
    const handleClick = () => {
      if (sqrs[index]) return; // عدم السماح باللعب في خانة مأخوذة
  
      handleChange(go);
      setGo(go === 'x' ? 'o' : 'x'); // تغيير اللاعب بعد كل حركة
    };
  
    const handleChange = (symbol) => {
      const newSqrs = [...sqrs];
      newSqrs[index] = symbol;
      setSqrs(newSqrs);
    };
  return (
    <div className={`square ${go}`} onClick={handleClick}>
      {sqrs[index]}
    </div>
  )
}
export default Sqr