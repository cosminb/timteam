export const action_focus_building = ({ index }, data) => {
  data.run('building_focus', { index });

  data.run('component_main_change', {
    id: 'infoPanel',
    style: {
      width: '50%',
      height: '100%',
    },
  });

  data.updateApp();
};

export const action_overview = ({}, data) => {
  data.run('buildings_overview', {});
  data.run('component_main_change', {
    id: 'infoPanel',
    style: {
      width: '0%',
      height: '0%',
    },
  });

  data.updateApp();
};

export const command_run = ({ command }, data) => {
  command = command.trim();

  let tokens = command.split(/[^\w\d]+/);

  console.log(command, tokens);
  let commandsMap = [
    {
      commandHead: 'show site',
      action: (tokens, data) => {
        data.run('action_focus_building', { index: parseInt(tokens[2]) });
      },
    },

    {
      commandHead: 'zoom out',
      action: (tokens, data) => {
        data.run('action_overview', { index: parseInt(tokens[2]) });
      },
    },
  ];

  for (var i = 0; i < commandsMap.length; i++) {
    let commandTpl = commandsMap[i];
    if (command.startsWith(commandTpl.commandHead)) {
      commandTpl.action(tokens, data);
      return;
    }
  }
};
