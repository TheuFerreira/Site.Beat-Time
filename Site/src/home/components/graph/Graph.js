import './css/Graph.min.css';

export default function Graph(props) {
    return (
        <section>
            <div className="container">
                <div id="local_chart"></div>

                <div className="top">
                    <div className="timeValue">
                        <button id="timeLeft"><span className="material-icons">arrow_back_ios</span></button>
                        <span id="timeValue"></span>
                        <button id="timeRight"><span className="material-icons">arrow_forward_ios</span></button>
                    </div>

                    <div id="bg-option">
                        <button id="buttonGraphOptions">
                            <span className="material-icons">more_vert</span>
                        </button>
                        <div className="background" id="graphOptions">
                            <div className="container">
                                <ul id="ulGraphOptions"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}