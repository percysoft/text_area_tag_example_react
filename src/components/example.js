// https://codepen.io/jukben/pen/bYZqvR?editors=1111
// https://github.com/webscopeio/react-textarea-autocomplete/
const Item = ({ entity: { name, char } }) => <div className="input_class">{`${name}: ${char}`}</div>;

const getTextValue = (evt) => {
  const onlyallArray = [
    { name: "smile", char: "🙂" },
    { name: "heart", char: "❤️" }
  ];
  const newArray = [];
  onlyallArray.map((item) => {
    if (item.name.includes(evt)) {
      newArray.push({
        name: item.name,
        char: item.char,
      })
    }
  })
  console.log(evt, 'evt');
  return newArray;
}
const rta = (
  <div className="container">
    <ReactTextareaAutocomplete
      className="my-textarea"
      onChange={e => console.log(e.target.value)}
      loadingComponent={() => <span>Loading</span>}
      trigger={{
        ":": {
          dataProvider: token => getTextValue(token),
          component: Item,
          output: (item, trigger) => item.char
        }
      }}
    />
  </div>
);

ReactDOM.render(rta, document.getElementById("root"));
