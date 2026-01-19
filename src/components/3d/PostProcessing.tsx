import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

const PostProcessing = () => {
    return (
        <EffectComposer>
            <Bloom
                intensity={1.2}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={new Vector2(0.001, 0.001)}
                radialModulation={false}
                modulationOffset={0.5}
            />
            <Vignette
                offset={0.3}
                darkness={0.5}
                blendFunction={BlendFunction.NORMAL}
            />
        </EffectComposer>
    );
};

export default PostProcessing;
