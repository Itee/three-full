//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default `
#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;

	}

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;

	}

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	#pragma unroll_loop
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;

	}

	#endif
#endif
`;
