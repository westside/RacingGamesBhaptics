class rf2Constants {

    MM_TELEMETRY_FILE_NAME = "$rFactor2SMMP_Telemetry$";
    MM_SCORING_FILE_NAME = "$rFactor2SMMP_Scoring$";
    MM_RULES_FILE_NAME = "$rFactor2SMMP_Rules$";
    MM_EXTENDED_FILE_NAME = "$rFactor2SMMP_Extended$";
    RFACTOR2_PROCESS_NAME = "rFactor2";
}

class rf2Struct {
    
}


/*
 [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi, Pack = 4)]
    public struct rF2Telemetry
    {
      public uint mVersionUpdateBegin;          // Incremented right before buffer is written to.
      public uint mVersionUpdateEnd;            // Incremented after buffer write is done.

      public int mBytesUpdatedHint;             // How many bytes of the structure were written during the last update.
                                                // 0 means unknown (whole buffer should be considered as updated).

      public int mNumVehicles;                  // current number of vehicles
      [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = rFactor2Constants.MAX_MAPPED_VEHICLES)]
      public rF2VehicleTelemetry[] mVehicles;
    }

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi, Pack = 4)]
        public struct rF2VehicleTelemetry
        {
            // Time
            public int mID;                      // slot ID (note that it can be re-used in multiplayer after someone leaves)
            public double mDeltaTime;             // time since last update (seconds)
            public double mElapsedTime;           // game session time
            public int mLapNumber;               // current lap number
            public double mLapStartET;            // time this lap was started
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]
            public byte[] mVehicleName;         // current vehicle name
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]
            public byte[] mTrackName;           // current track name

            // Position and derivatives
            public rF2Vec3 mPos;                  // world position in meters
            public rF2Vec3 mLocalVel;             // velocity (meters/sec) in local vehicle coordinates
            public rF2Vec3 mLocalAccel;           // acceleration (meters/sec^2) in local vehicle coordinates

            // Orientation and derivatives
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
            public rF2Vec3[] mOri;               // rows of orientation matrix (use TelemQuat conversions if desired), also converts local
                                                 // vehicle vectors into world X, Y, or Z using dot product of rows 0, 1, or 2 respectively
            public rF2Vec3 mLocalRot;             // rotation (radians/sec) in local vehicle coordinates
            public rF2Vec3 mLocalRotAccel;        // rotational acceleration (radians/sec^2) in local vehicle coordinates

            // Vehicle status
            public int mGear;                    // -1=reverse, 0=neutral, 1+=forward gears
            public double mEngineRPM;             // engine RPM
            public double mEngineWaterTemp;       // Celsius
            public double mEngineOilTemp;         // Celsius
            public double mClutchRPM;             // clutch RPM

            // Driver input
            public double mUnfilteredThrottle;    // ranges  0.0-1.0
            public double mUnfilteredBrake;       // ranges  0.0-1.0
            public double mUnfilteredSteering;    // ranges -1.0-1.0 (left to right)
            public double mUnfilteredClutch;      // ranges  0.0-1.0

            // Filtered input (various adjustments for rev or speed limiting, TC, ABS?, speed sensitive steering, clutch work for semi-automatic shifting, etc.)
            public double mFilteredThrottle;      // ranges  0.0-1.0
            public double mFilteredBrake;         // ranges  0.0-1.0
            public double mFilteredSteering;      // ranges -1.0-1.0 (left to right)
            public double mFilteredClutch;        // ranges  0.0-1.0

            // Misc
            public double mSteeringShaftTorque;   // torque around steering shaft (used to be mSteeringArmForce, but that is not necessarily accurate for feedback purposes)
            public double mFront3rdDeflection;    // deflection at front 3rd spring
            public double mRear3rdDeflection;     // deflection at rear 3rd spring

            // Aerodynamics
            public double mFrontWingHeight;       // front wing height
            public double mFrontRideHeight;       // front ride height
            public double mRearRideHeight;        // rear ride height
            public double mDrag;                  // drag
            public double mFrontDownforce;        // front downforce
            public double mRearDownforce;         // rear downforce

            // State/damage info
            public double mFuel;                  // amount of fuel (liters)
            public double mEngineMaxRPM;          // rev limit
            public byte mScheduledStops; // number of scheduled pitstops
            public byte mOverheating;            // whether overheating icon is shown
            public byte mDetached;               // whether any parts (besides wheels) have been detached
            public byte mHeadlights;             // whether headlights are on
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 8)]
            public byte[] mDentSeverity;// dent severity at 8 locations around the car (0=none, 1=some, 2=more)
            public double mLastImpactET;          // time of last impact
            public double mLastImpactMagnitude;   // magnitude of last impact
            public rF2Vec3 mLastImpactPos;        // location of last impact

            // Expanded
            public double mEngineTorque;          // current engine torque (including additive torque) (used to be mEngineTq, but there's little reason to abbreviate it)
            public int mCurrentSector;           // the current sector (zero-based) with the pitlane stored in the sign bit (example: entering pits from third sector gives 0x80000002)
            public byte mSpeedLimiter;   // whether speed limiter is on
            public byte mMaxGears;       // maximum forward gears
            public byte mFrontTireCompoundIndex;   // index within brand
            public byte mRearTireCompoundIndex;    // index within brand
            public double mFuelCapacity;          // capacity in liters
            public byte mFrontFlapActivated;       // whether front flap is activated
            public byte mRearFlapActivated;        // whether rear flap is activated
            public byte mRearFlapLegalStatus;      // 0=disallowed, 1=criteria detected but not allowed quite yet, 2=allowed
            public byte mIgnitionStarter;          // 0=off 1=ignition 2=ignition+starter

            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 18)]
            public byte[] mFrontTireCompoundName;         // name of front tire compound
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 18)]
            public byte[] mRearTireCompoundName;          // name of rear tire compound

            public byte mSpeedLimiterAvailable;    // whether speed limiter is available
            public byte mAntiStallActivated;       // whether (hard) anti-stall is activated
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 2)]
            public byte[] mUnused;                //
            public float mVisualSteeringWheelRange;         // the *visual* steering wheel range

            public double mRearBrakeBias;                   // fraction of brakes on rear
            public double mTurboBoostPressure;              // current turbo boost pressure if available
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
            public float[] mPhysicsToGraphicsOffset;       // offset from static CG to graphical center
            public float mPhysicalSteeringWheelRange;       // the *physical* steering wheel range

            // Future use
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 152)]
            public byte[] mExpansion;           // for future use (note that the slot ID has been moved to mID above)

            // keeping this at the end of the structure to make it easier to replace in future versions
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)]
            public rF2Wheel[] mWheels;                      // wheel info (front left, front right, rear left, rear right)
        }

*/