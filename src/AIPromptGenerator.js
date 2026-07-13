import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const AIPromptGenerator = () => {
  const [subject, setSubject] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [metaTokens, setMetaTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cameraTokens = [
    'Sony A1',
    'Canon EOS R5',
    'Nikon Z9',
    'Hasselblad H6D',
    'Phase One XF IQ4',
    'Leica S3',
    'Pentax 645Z',
    'Fujifilm GFX100S',
  ];

  const lensTokens = [
    'Carl Zeiss Otus 85mm f/1.4',
    'Leica Noctilux 50mm f/0.95',
    'Canon EF 85mm f/1.2L',
    'Zeiss Milvus 35mm f/1.4',
    'Sigma Art 35mm f/1.4 DG HSM',
    'Voigtländer Nokton 58mm f/0.95',
    'Tamron SP 35mm f/1.8',
    'Rokinon Cine DS 24mm T/1.5',
  ];

  const lightingTokens = [
    'Golden hour sunlight',
    'Soft window light',
    'Professional studio key light with fill',
    'Cinematic three-point lighting',
    'Rim lighting, backlit',
    'High-key dramatic lighting',
    'Neon and ambient light blend',
    'Natural overcast diffused light',
    'Side-lit with deep shadows',
    'Volumetric light rays',
  ];

  const focalLengthTokens = [
    '85mm f/1.4 shallow depth of field',
    '50mm f/1.2 cinematic bokeh',
    '35mm f/1.4 environmental portrait',
    '100mm f/2 macro detail',
    '24mm f/1.4 wide environmental',
    '135mm f/1.8 telephoto compression',
  ];

  const sceneTokens = [
    'studio backdrop',
    'natural outdoor environment',
    'minimalist white backdrop',
    'textured industrial setting',
    'luxury interior space',
    'dramatic moody atmosphere',
    'clean minimal composition',
    'layered depth and dimension',
  ];

  const qualityTokens = [
    '8K UHD resolution',
    'razor-sharp focus',
    'exceptional clarity and detail',
    'chromatic aberration free',
    'museum-quality print',
    'hyper-realistic skin texture',
    'fine hair detail reproduction',
    'crystalline sharpness',
    'perfect micro-contrast',
    'lossless detail preservation',
    'extreme dynamic range',
    'color-accurate rendering',
  ];

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generatePrompt = () => {
    if (!subject.trim()) {
      alert('Please enter a subject');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const selectedTokens = {
        camera: getRandomItem(cameraTokens),
        lens: getRandomItem(lensTokens),
        lighting: getRandomItem(lightingTokens),
        focalLength: getRandomItem(focalLengthTokens),
        scene: getRandomItem(sceneTokens),
        qualityKeywords: [
          getRandomItem(qualityTokens),
          getRandomItem(qualityTokens),
        ],
      };

      const prompt = `Professional photography of ${subject}. Shot on ${selectedTokens.camera} with ${selectedTokens.lens}. ${selectedTokens.lighting}. Composition: ${selectedTokens.focalLength}. Setting: ${selectedTokens.scene}. Image quality: ${selectedTokens.qualityKeywords.join(', ')}. Masterpiece, award-winning photography, professional grade.`;

      setMetaTokens(selectedTokens);
      setGeneratedPrompt(prompt);
      setIsLoading(false);
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') generatePrompt();
  };

  return (
    <>
      <Helmet>
        <title>AI Image Prompt Generator | All Powerful Marketing</title>
        <meta
          name="description"
          content="Generate professional AI image prompts with advanced camera and lighting meta tokens for exceptional realism and clarity."
        />
      </Helmet>

      <div className="min-h-screen bg-black text-white font-sans">
        {/* Header */}
        <div className="border-b-4 border-white bg-black py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-2 leading-tight tracking-tighter">
              PROMPT<br />GENERATOR
            </h1>
            <div className="h-1 w-32 bg-white mb-6"></div>
            <p className="text-xl md:text-2xl font-light tracking-wide">
              PROFESSIONAL AI IMAGE PROMPT GENERATION WITH ADVANCED META TOKENS
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div>
              <div className="border-4 border-white bg-black p-8">
                <label className="block text-2xl font-black mb-6 tracking-tight">
                  ENTER SUBJECT
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., ethereal woman in mountain landscape, luxury watch, futuristic cityscape..."
                  className="w-full bg-white text-black px-6 py-4 text-lg border-3 border-black font-medium placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black"
                />

                <button
                  onClick={generatePrompt}
                  disabled={isLoading}
                  className="w-full mt-8 bg-white text-black px-8 py-5 text-2xl font-black border-4 border-black hover:bg-black hover:text-white hover:border-white transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-tight"
                >
                  {isLoading ? 'GENERATING...' : 'GENERATE PROMPT'}
                </button>

                {/* Meta Tokens Legend */}
                <div className="mt-12 border-t-4 border-white pt-8">
                  <h3 className="text-xl font-black mb-6 tracking-tight">
                    META TOKEN CATEGORIES
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-black text-sm tracking-widest mb-2">
                        CAMERAS
                      </p>
                      <p className="text-sm leading-relaxed text-gray-300">
                        Professional-grade sensor bodies (Sony A1, Canon EOS R5,
                        Hasselblad, Phase One)
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm tracking-widest mb-2">
                        LENSES
                      </p>
                      <p className="text-sm leading-relaxed text-gray-300">
                        High-end optics (Carl Zeiss Otus, Leica Noctilux,
                        premium primes)
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm tracking-widest mb-2">
                        LIGHTING
                      </p>
                      <p className="text-sm leading-relaxed text-gray-300">
                        Professional lighting setups (golden hour, studio key
                        light, rim lighting)
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm tracking-widest mb-2">
                        FOCAL LENGTH
                      </p>
                      <p className="text-sm leading-relaxed text-gray-300">
                        Optimal aperture and composition (85mm f/1.4, 50mm f/1.2)
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm tracking-widest mb-2">
                        QUALITY TOKENS
                      </p>
                      <p className="text-sm leading-relaxed text-gray-300">
                        Exceptional image fidelity (8K resolution, razor-sharp,
                        crystalline sharpness)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div>
              {generatedPrompt ? (
                <div className="space-y-8">
                  {/* Meta Tokens Display */}
                  <div className="border-4 border-white bg-black p-8">
                    <h3 className="text-2xl font-black mb-6 tracking-tight">
                      SELECTED META TOKENS
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-white pl-4">
                        <p className="font-black text-xs tracking-widest text-gray-400 mb-1">
                          CAMERA
                        </p>
                        <p className="text-lg font-bold">
                          {metaTokens.camera}
                        </p>
                      </div>
                      <div className="border-l-4 border-white pl-4">
                        <p className="font-black text-xs tracking-widest text-gray-400 mb-1">
                          LENS
                        </p>
                        <p className="text-lg font-bold">{metaTokens.lens}</p>
                      </div>
                      <div className="border-l-4 border-white pl-4">
                        <p className="font-black text-xs tracking-widest text-gray-400 mb-1">
                          LIGHTING
                        </p>
                        <p className="text-lg font-bold">
                          {metaTokens.lighting}
                        </p>
                      </div>
                      <div className="border-l-4 border-white pl-4">
                        <p className="font-black text-xs tracking-widest text-gray-400 mb-1">
                          FOCAL LENGTH
                        </p>
                        <p className="text-lg font-bold">
                          {metaTokens.focalLength}
                        </p>
                      </div>
                      <div className="border-l-4 border-white pl-4">
                        <p className="font-black text-xs tracking-widest text-gray-400 mb-1">
                          SCENE
                        </p>
                        <p className="text-lg font-bold">{metaTokens.scene}</p>
                      </div>
                      <div className="border-l-4 border-white pl-4">
                        <p className="font-black text-xs tracking-widest text-gray-400 mb-1">
                          QUALITY KEYWORDS
                        </p>
                        <p className="text-lg font-bold">
                          {metaTokens.qualityKeywords.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Generated Prompt */}
                  <div className="border-4 border-white bg-black p-8">
                    <h3 className="text-2xl font-black mb-6 tracking-tight">
                      GENERATED PROMPT
                    </h3>
                    <div className="bg-white text-black p-6 min-h-48 flex items-center">
                      <p className="text-base leading-relaxed font-medium">
                        {generatedPrompt}
                      </p>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="w-full mt-6 bg-white text-black px-8 py-4 text-lg font-black border-4 border-black hover:bg-black hover:text-white hover:border-white transition-all duration-200 cursor-pointer tracking-tight"
                    >
                      COPY TO CLIPBOARD
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-4 border-white bg-black p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-black tracking-tight mb-4">
                      ENTER A SUBJECT &
                    </p>
                    <p className="text-xl font-black tracking-tight">
                      GENERATE YOUR PROMPT
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t-4 border-white mt-16 bg-black py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-light tracking-widest text-gray-400">
              Generates professional AI image prompts with advanced meta tokens
              optimized for exceptional realism, clarity, and high-fidelity
              output across all AI image generation platforms.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIPromptGenerator;
