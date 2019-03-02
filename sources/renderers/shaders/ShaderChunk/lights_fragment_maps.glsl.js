//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default `
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage

		#endif

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )

		irradiance += getLightProbeIndirectIrradiance(  geometry, maxMipLevel );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	radiance += getLightProbeIndirectRadiance(  geometry, Material_BlinnShininessExponent( material ), maxMipLevel );

	#ifndef STANDARD
		clearCoatRadiance += getLightProbeIndirectRadiance(  geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );
	#endif

#endif
`;
