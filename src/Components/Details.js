import React, { useEffect } from 'react';
import _ from 'lodash';
import { a, useSprings } from 'react-spring';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const Details = ({ activeFloor, setActiveFloor, floorName }) => {

  let hardcodedDetails = [
    {
      id: 0,
      floorName: 'Ground Floor',
      doors: ['Door1', 'Door2', 'Door3'],
      panels: ['Panel1', 'Panel2', 'Panel3'],
      cameras: ['Camera1', 'Camera2', 'Camera3'],
    },
    {
      id: 1,
      floorName: 'First Floor',
      doors: ['Door11', 'Door12', 'Door13'],
      panels: ['Panel1', 'Panel2', 'Panel3'],
      cameras: ['Camera1', 'Camera2', 'Camera3'],
    },
    {
      id: 2,
      floorName: 'Second Floor',
      doors: ['Door21', 'Door22', 'Door23'],
      panels: ['Panel1', 'Panel2', 'Panel3'],
      cameras: ['Camera1', 'Camera2', 'Camera3'],
    },
    {
      id: 3,
      floorName: 'Third Floor',
      doors: ['Door31', 'Door32', 'Door33'],
      panels: ['Panel1', 'Panel2', 'Panel3'],
      cameras: ['Camera1', 'Camera2', 'Camera3'],
    },
    {
      id: 4,
      floorName: 'Fourth Floor',
      doors: ['Door41', 'Door42', 'Door43'],
      panels: ['Panel1', 'Panel2', 'Panel3'],
      cameras: ['Camera1', 'Camera2', 'Camera3'],
    },
  ];

  let currentCameras = [];
  let currentDoors = [];
  let currentPanels = [];

    hardcodedDetails.map(floor => {
      if(activeFloor === floor.id) {
        currentCameras = floor.cameras;
        currentDoors = floor.doors;
        currentPanels = floor.panels;
        console.log("currentCameras ", currentCameras);
      }
    });

  return (
    <div style={{ marginTop: '50px' }}>
      <div className="root" style={{ margin: '50px' }}>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">Panels</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {currentPanels}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">Doors</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {currentDoors}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">Cameras</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {currentCameras}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};
