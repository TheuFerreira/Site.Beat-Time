import './css/QuestionDialog.min.css';

export default function QuestionDialog() {
    return (
        <div className="popup" id="questionDialog">
            <div className="container">
                <div id="info">
                    <div className="title">
                        <span className="material-icons">warning</span>
                        <span id="popupTitle"></span>
                    </div>
                    <p id="popupDescription"></p>
                </div>
                <div className="buttons">
                    <button id="yesQuestionDialog">Sim</button>
                    <button id="noQuestionDialog">Não</button>
                </div>
            </div>
        </div>
    );
}