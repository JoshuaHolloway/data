(function (React, ReactDOM) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
    React__default.createElement( 'select', { id: id, onChange: event => onSelectedValueChange(event.target.value) },
      options.map(({ value, label }) => (
        React__default.createElement( 'option', { value: value, selected: value === selectedValue },
          label
        )
      ))
    )
  );

  const options = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'parrot', label: 'Parrot' },
    { value: 'spider', label: 'Spider' },
    { value: 'goldfish', label: 'Goldfish' }
  ];
  const initialValue = 'hamster';

  const App = () => {
    const [selectedValue, setSelectedValue] = React.useState(initialValue);
    console.log(selectedValue);
    return (
      React__default.createElement( 'div', null,
        React__default.createElement( 'label', { for: "pet-select" }, "Choose a pet:"),
        React__default.createElement( Dropdown, {
          options: options, id: "pet-select", selectedValue: selectedValue, onSelectedValueChange: setSelectedValue })
      )
    );
  };

  const rootElement = document.getElementById('root');
  ReactDOM.render(React__default.createElement( App, null ), rootElement);

}(React, ReactDOM));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIkRyb3Bkb3duLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IERyb3Bkb3duID0gKHsgb3B0aW9ucywgaWQsIHNlbGVjdGVkVmFsdWUsIG9uU2VsZWN0ZWRWYWx1ZUNoYW5nZSB9KSA9PiAoXG4gIDxzZWxlY3QgaWQ9e2lkfSBvbkNoYW5nZT17ZXZlbnQgPT4gb25TZWxlY3RlZFZhbHVlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9PlxuICAgIHtvcHRpb25zLm1hcCgoeyB2YWx1ZSwgbGFiZWwgfSkgPT4gKFxuICAgICAgPG9wdGlvbiB2YWx1ZT17dmFsdWV9IHNlbGVjdGVkPXt2YWx1ZSA9PT0gc2VsZWN0ZWRWYWx1ZX0+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvb3B0aW9uPlxuICAgICkpfVxuICA8L3NlbGVjdD5cbik7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJy4vRHJvcGRvd24nO1xuXG5jb25zdCBvcHRpb25zID0gW1xuICB7IHZhbHVlOiAnZG9nJywgbGFiZWw6ICdEb2cnIH0sXG4gIHsgdmFsdWU6ICdjYXQnLCBsYWJlbDogJ0NhdCcgfSxcbiAgeyB2YWx1ZTogJ2hhbXN0ZXInLCBsYWJlbDogJ0hhbXN0ZXInIH0sXG4gIHsgdmFsdWU6ICdwYXJyb3QnLCBsYWJlbDogJ1BhcnJvdCcgfSxcbiAgeyB2YWx1ZTogJ3NwaWRlcicsIGxhYmVsOiAnU3BpZGVyJyB9LFxuICB7IHZhbHVlOiAnZ29sZGZpc2gnLCBsYWJlbDogJ0dvbGRmaXNoJyB9XG5dO1xuY29uc3QgaW5pdGlhbFZhbHVlID0gJ2hhbXN0ZXInO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IFtzZWxlY3RlZFZhbHVlLCBzZXRTZWxlY3RlZFZhbHVlXSA9IHVzZVN0YXRlKGluaXRpYWxWYWx1ZSk7XG4gIGNvbnNvbGUubG9nKHNlbGVjdGVkVmFsdWUpO1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgZm9yPVwicGV0LXNlbGVjdFwiPkNob29zZSBhIHBldDo8L2xhYmVsPlxuICAgICAgPERyb3Bkb3duXG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgIGlkPVwicGV0LXNlbGVjdFwiXG4gICAgICAgIHNlbGVjdGVkVmFsdWU9e3NlbGVjdGVkVmFsdWV9XG4gICAgICAgIG9uU2VsZWN0ZWRWYWx1ZUNoYW5nZT17c2V0U2VsZWN0ZWRWYWx1ZX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgcm9vdEVsZW1lbnQpO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUVPLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBRTtJQUM1RUEsMENBQVEsSUFBSSxFQUFHLEVBQUMsVUFBVSxLQUFLLElBQUkscUJBQXFCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7TUFDMUUsT0FBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtRQUM1QkEsMENBQVEsT0FBTyxLQUFNLEVBQUMsVUFBVSxLQUFLLEtBQUssYUFBYTtVQUNwRCxLQUFLO1NBQ0M7T0FDVixDQUFDO0tBQ0s7R0FDVjs7RUNORCxNQUFNLE9BQU8sR0FBRztJQUNkLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzlCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzlCLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO0lBQ3RDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0lBQ3BDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0lBQ3BDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO0dBQ3pDLENBQUM7RUFDRixNQUFNLFlBQVksR0FBRyxTQUFTLENBQUM7O0VBRS9CLE1BQU0sR0FBRyxHQUFHLE1BQU07SUFDaEIsTUFBTSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHQyxjQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQjtNQUNFRDtRQUNFQSx5Q0FBTyxLQUFJLFlBQVksSUFBQyxlQUFhO1FBQ3JDQSw4QkFBQztVQUNDLFNBQVMsT0FBUSxFQUNqQixJQUFHLFlBQVksRUFDZixlQUFlLGFBQWEsRUFDNUIsdUJBQXVCLGdCQUFnQixFQUFDLENBQ3hDO09BQ0U7TUFDTjtHQUNILENBQUM7O0VBRUYsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNwRCxRQUFRLENBQUMsTUFBTSxDQUFDQSw4QkFBQyxTQUFHLEVBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQzs7OzsifQ==