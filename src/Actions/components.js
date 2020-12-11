export const component_main_change = ({ id, style, props }, data) => {
  let path = 'app.subs.root.subs.' + id;
  let component = _.get(data.specTree, path);

  if (style) {
    component.props.style = { ...component.props.style, ...style };
  }

  if (props) {
    component.props = { ...component.props, ...props };
  }
  // component.props = { ...component.props, props };
  //_.merge(component, { props, ...spec });
};

export const card_change = ({ id, props = {}, spec = {}, remove = false }) => {
  let path = 'app.subs.root.subs.sidebar.subs.' + id;

  if (remove) _.unset(data.specTree, path);
  else {
    let component = _.get(data.specTree, path);

    _.merge(component, { props, ...spec });
  }
};
