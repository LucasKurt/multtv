import './styles.css'

function ToggleSwitch({ name, id, value, onChange, onClick, checked }) {
  return (
    <label className="switch mt-1" id="switch">
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
      />
      <span className="slider round" />
    </label>
  )
}

export default ToggleSwitch