import { Card } from '../Svgraphics/Cards/Card';
import { Card3 } from '../Svgraphics/Cards/Card3';
import { Card4 } from '../Svgraphics/Cards/Card4';
import { MainBar } from '../Components/MainBar';
import { GenerateBuildings } from '../DataNodes/GenerateBuildings';
import { ProcessBuildings } from '../DataNodes/ProcessBuildings';
import { Sidebar } from '../Components/Sidebar';
import { Console } from '../Components/Console';
import { Hud } from '../Components/Hud';
import { Card5 } from '../Svgraphics/Cards/Card5';
import { InfoPanel } from '../Components/InfoPanel';

export const specTree = {
  app: {
    subs: {
      root: {
        component: 'div',
        props: {
          style: {
            display: 'grid',
            height: '100%',
            width: '100%',
            gridTemplate: `"hud sidebar" 1fr
                         "console sidebar" 200px / 1fr 300px`,
            gridGap: 20,
            padding: 20,
          },
        },
        data: {
          colors: {
            value: {
              buildings: {
                site: 'red',
                neighbour: 'blue',
              },
            },
          },

          buildingSizes: {
            value: {
              cellSize: 75,
              blockSize: 45,
              hieghtUnit: 10,
            },
          },
          buildings: {
            processor: GenerateBuildings,
            props: {
              cols: 10,
              rows: 10,
            },
          },
          buildingsNodes: {
            processor: ProcessBuildings,
            props: {},
          },
        },
        subs: {
          hud: {
            component: Hud,
            props: {
              style: {
                gridArea: 'hud',
              },
            },
            use: {
              buildings: 'buildings',
            },
          },
          sidebar: {
            component: Sidebar,
            hidden: false,
            props: {
              style: {
                gridArea: 'sidebar',
              },
            },

            subs: [
              { component: Card },
              { component: Card3 },
              { component: Card4 },
              { component: Card5 },
            ],
          },
          console: {
            component: MainBar,
            props: {
              style: {
                gridArea: 'console',
              },
            },
          },

          infoPanel: {
            component: InfoPanel,
            props: {
              style: {
                gridArea: 'hud',
                width: '30%',
                height: '30%',
              },
            },
          },
        },
      },
    },
  },
};
