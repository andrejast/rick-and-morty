import './rickMorty.css'
export const RickMorty = () => {
  return (
    <div className="flex items-end justify-center">
      <div className="rick-container glowing-border overflow-hidden">
        <div className="head-container">
          <div className="head">
            <div className="brow-container">
              <div className="brow"></div>
            </div>
            <div className="eyes-container">
              <div className="left eye">
                <div className="pupil"></div>
              </div>
              <div className="right eye">
                <div className="pupil"></div>
              </div>
            </div>
            <div className="eyebags-container">
              <div className="left eyebag"></div>
              <div className="right eyebag"></div>
            </div>
            <div className="nose"></div>
            <div className="mouth-container">
              <div className="mouth"></div>
              <div className="spittle"></div>
              <div className="spittle-arcs"></div>
            </div>
          </div>
          <div className="ear-container">
            <div className="left ear"></div>
            <div className="right ear"></div>
          </div>
          <div className="hair-container">
            <div className="hair"></div>
          </div>
          <div className="neck"></div>
        </div>
        <div className="body-container">
          <div className="body">
            <div className="shirt">
              <div className="flaps-container">
                <div className="left flap"></div>
                <div className="right flap"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="morty-container glowing-border overflow-hidden bg-[#1d232a] ml-14">
        <div className="head-container">
          <div className="head">
            <div className="brows-container">
              <div className="left brow"></div>
              <div className="right brow"></div>
            </div>
            <div className="eyes-container">
              <div className="left eye">
                <div className="pupil"></div>
              </div>
              <div className="right eye">
                <div className="pupil"></div>
              </div>
            </div>
            <div className="nose"></div>
            <div className="mouth-container">
              <div className="mouth"></div>
            </div>
          </div>
          <div className="ear-container">
            <div className="left ear"></div>
            <div className="right ear"></div>
          </div>
          <div className="hair-container">
            <div className="hair"></div>
          </div>
        </div>
        <div className="body-container">
          <div className="body"></div>
        </div>
      </div>
    </div>
  );
};
