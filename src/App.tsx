import React, { useState, useCallback, useEffect } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Page,
  Card,
  TextField,
  ColorPicker,
} from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";

import { ColorProps } from "./types/ColorTypes";
import { quoteColor } from "./services/Quote";

const App: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [color, setColor] = useState<ColorProps>({
    hue: 120,
    brightness: 1,
    saturation: 1,
    alpha: 1,
  });

  // eslint-disable-next-line
  const [image, setImage] = useState("");

  useEffect(() => {
    (async function resources() {
      const results = await quoteColor(color, quote);

      if (results.length > 0) {
        setImage(results);
      }
    })();
    // eslint-disable-next-line
  }, [color.hue, color.brightness, color.saturation, color.alpha, quote]);

  const handleChange = useCallback((newQuote) => setQuote(newQuote), []);

  return (
    <AppProvider i18n={enTranslations}>
      <div className="App">
        <Page title="Quote App">
          <Card sectioned>
            <TextField
              label="Your Quote"
              value={quote}
              onChange={handleChange}
              placeholder="Your quote"
              maxLength={100}
            />
            <div style={{ marginTop: 20 }}>
              <ColorPicker onChange={setColor} color={color} allowAlpha />
            </div>
            <img
              src={image}
              alt=""
              width={800}
              height={400}
              style={{ marginTop: 20, backgroundColor: "#000000" }}
            />
          </Card>
        </Page>
      </div>
    </AppProvider>
  );
};

export default App;
