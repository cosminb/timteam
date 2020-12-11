import React, { useEffect } from 'react';
import _ from 'lodash';
import { a, useSprings } from 'react-spring';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export const Details = ({ activeFloor, setActiveFloor, floorName }) => {

  let hardcodedDetails = [
    {
      id: 4,
      floorName: 'Ground Floor',
      doors: ['Door1', 'Door2', 'Door3'],
      panels: ['Panel1', 'Panel2', 'Panel3'],
      cameras: ['Camera1', 'Camera2', 'Camera3'],
      hasError: "",
    },
    {
      id: 3,
      floorName: 'First Floor',
      doors: ['Door 11', 'Door 12', 'Door 13'],
      panels: ['Panel 11', 'Panel 12', 'Panel 13'],
      cameras: ['Camera 11', 'Camera 12', 'Camera 13'],
      hasError: "Panel 12 from floor F4 has status: Battery Level Very Low",
    },
    {
      id: 2,
      floorName: 'Second Floor',
      doors: ['Door 21', 'Door 22', 'Door 23'],
      panels: ['Panel 21', 'Panel 22', 'Panel 23'],
      cameras: ['Camera 21', 'Camera 22', 'Camera 23'],
      hasError: "",
    },
    {
      id: 1,
      floorName: 'Third Floor',
      doors: ['Door 31', 'Door 32', 'Door 33'],
      panels: ['Panel 31', 'Panel 32', 'Panel 33'],
      cameras: ['Camera 31', 'Camera 32', 'Camera 33'],
      hasError: "Door 33 from floor F3 has status: Held open too long"
    },
    {
      id: 0,
      floorName: 'Fourth Floor',
      doors: ['Door 41', 'Door 42', 'Door 43'],
      panels: ['Panel 41', 'Panel 42', 'Panel 43'],
      cameras: ['Camera 41', 'Camera 42', 'Camera 43'],
      hasError: "",
    },
  ];

  let currentCameras = [];
  let currentDoors = [];
  let currentPanels = [];
  let currentError = "";

    hardcodedDetails.map(floor => {
      if(activeFloor === floor.id) {
        floorName = floor.floorName;
        currentCameras = floor.cameras;
        currentDoors = floor.doors;
        currentPanels = floor.panels;
        currentError = floor.hasError;
      }
    });

  return (
    <div style={{ marginTop: '50px' }}>
      <div>{floorName}</div>
      <div className="root" style={{ margin: '50px' }}>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#154360'}}>
            <Typography className="heading">Panels</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: '#154360'}}>
            {currentPanels.map(panel => (
            <Card className="root"  style={{ margin: '10px' }}>
                <CardContent>
                  <Typography  color="textSecondary" gutterBottom>
                    {panel}
                  </Typography>
                  <Typography  color="textSecondary" gutterBottom>
                    {currentError.includes(panel) ? currentError : null }
                  </Typography>
                </CardContent>
              </Card>))
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#154360'}}>
            <Typography className="heading">Doors</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: '#154360'}}>
            {currentDoors.map(door => (
            <Card className="root" style={{ margin: '10px' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {door}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {currentError.includes(door) ? currentError : null }
                  </Typography>
                </CardContent>
              </Card>))
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#154360'}}>
            <Typography className="heading">Cameras</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: '#154360'}}>
            {currentCameras.map(camera => (
            <Card className="root" style={{ margin: '10px' }}>
                <CardContent>
                  <Typography  color="textSecondary" gutterBottom>
                    {camera}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {currentError.includes(camera) ? currentError : null }
                  </Typography>
                </CardContent>
              </Card>))
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};
