const React = require('react');
const PropTypes = require('prop-types');

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  },
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }

  componentDidMount() {
    const { text, speed } = this.props;
    var stopper = `${text}...`;
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text }))
        : this.setState(({ text }) => ({ text: text + '.' }));
    }, speed);
  }

  componentWillMount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};

module.exports = Loading;
