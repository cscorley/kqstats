import { GameStats, GameStatsType, KQStat } from '../../lib/GameStats';
import * as React from 'react';
import sprites from '../img/sprites';
import { KQStream, KQStreamOptions } from '../../lib/KQStream';

abstract class KillboardBase extends React.Component {
  state: GameStatsType = GameStats.defaultGameStats;

  stream: KQStream;
  gameStats: GameStats;

  static getCrowns(n: number) {
    const crown = <img className="crown" src={sprites.crown} />;
    const html: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      html.push(crown);
    }
    return html;
  }

  async connect(stream: KQStream, address: string) {
    if (address === undefined) {
      const ip = 'kq.lan';
      address = `ws://${ip}:12749`;
    }
    console.log(`Connecting to ${address}...`);
    try {
      await stream.connect(address);
    } catch (error) {
      console.log(`Connection failed, waiting 5 seconds...`, error);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve(this.connect(stream, address));
        }, 5 * 1000);
      });
    }
    console.log('Connected!');
  }

  constructor(props: {}) {
    super(props);

    const options: KQStreamOptions = {};
    this.stream = new KQStream(options);
    this.gameStats = new GameStats(this.stream);
    this.gameStats.start();

    this.gameStats.on('change', (data: KQStat) => {
      this.setState((prevState) => {
        let characterStats = prevState[data.character];
        if (characterStats === undefined) {
          characterStats = {};
        }
        characterStats[data.statistic] = data.value;
        return {
          [data.character]: characterStats,
        };
      });
    });
  }

  componentWillMount() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }

  async componentDidMount() {
    await this.connect(this.stream, 'ws://kq.lan:12749');
  }
}

export default KillboardBase;
