

// Helper function to calculate the cross product of two vectors
function crossProduct(vec1, vec2)
{
    if (vec1.length !== 3 || vec2.length !== 3)
    {
        throw new Error('Vectors must be 3-dimensional arrays');
    }

    return [
        vec1[1] * vec2[2] - vec1[2] * vec2[1],
        vec1[2] * vec2[0] - vec1[0] * vec2[2],
        vec1[0] * vec2[1] - vec1[1] * vec2[0]
    ];
}
 // Vector addition
function vectorAdd(a, b)
{
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
// Helper function to calculate the magnitude of a vector
function magnitude(vec)
{
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
}

// Helper function to calculate the dot product of two vectors
function dotProduct(v1, v2)
{
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

// Helper function to normalize a vector
function normalize(vector)
{
    var len = magnitude(vector);
    if (len === 0)
    {
        throw new Error("Cannot normalize a zero vector");
    }
    return [vector[0] / len, vector[1] / len, vector[2] / len];
}

// Function to rotate a point around an axis by a given angle
function rotatePoint(point, axis, angle)
{
    axis = normalize(axis);
    var ux = axis[0], uy = axis[1], uz = axis[2];
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);
    var oneMinusCosA = 1 - cosA;

    // Rotation matrix (Rodrigues' rotation formula)
    var rotMatrix = [
        [cosA + ux * ux * oneMinusCosA, ux * uy * oneMinusCosA - uz * sinA, ux * uz * oneMinusCosA + uy * sinA],
        [uy * ux * oneMinusCosA + uz * sinA, cosA + uy * uy * oneMinusCosA, uy * uz * oneMinusCosA - ux * sinA],
        [uz * ux * oneMinusCosA - uy * sinA, uz * uy * oneMinusCosA + ux * sinA, cosA + uz * uz * oneMinusCosA]
    ];

    // Apply rotation matrix to the point
    return [
        rotMatrix[0][0] * point[0] + rotMatrix[0][1] * point[1] + rotMatrix[0][2] * point[2],
        rotMatrix[1][0] * point[0] + rotMatrix[1][1] * point[1] + rotMatrix[1][2] * point[2],
        rotMatrix[2][0] * point[0] + rotMatrix[2][1] * point[1] + rotMatrix[2][2] * point[2]
    ];
}

// Function to solve for a point along the axis using parameter t
function solveT(axis, t)
{
	var output =
	[
        axis[0] * t,
        axis[1] * t,
        axis[2] * t
    ];
    return output;
}


function findAnglesBetweenVectors(v1, v2)
{
    v1 = normalize(v1);
    v2 = normalize(v2);

    // Angle between vectors in the XY plane
    var dotXY = v1[0] * v2[0] + v1[1] * v2[1];
    var magXY1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
    var magXY2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
    var angleXY = Math.acos(dotXY / (magXY1 * magXY2));

    // Angle between vectors in the XZ plane
    var dotXZ = v1[0] * v2[0] + v1[2] * v2[2];
    var magXZ1 = Math.sqrt(v1[0] * v1[0] + v1[2] * v1[2]);
    var magXZ2 = Math.sqrt(v2[0] * v2[0] + v2[2] * v2[2]);
    var angleXZ = Math.acos(dotXZ / (magXZ1 * magXZ2));

    return { angleXY: angleXY, angleXZ: angleXZ };
}
//[0,1,0] and [0,0,1] are to [1,0,0] as output is to inputVec
function getReferencePoints(inputVec)
{
    var referenceVec = [1, 0, 0];
    var refVec1 = [0, 1, 0];
    var refVec2 = [0, 0, 1];

    // Calculate angles between inputVec and referenceVec
    var angles = findAnglesBetweenVectors(referenceVec, inputVec);

    // Apply rotations
    var rotatedVec1 = rotatePoint(refVec1, [0, 1, 0], angles.angleXZ); // Rotate around Y-axis (XZ plane)
    rotatedVec1 = rotatePoint(rotatedVec1, [0, 0, 1], angles.angleXY); // Rotate around Z-axis (XY plane)

    var rotatedVec2 = rotatePoint(refVec2, [0, 1, 0], angles.angleXZ); // Rotate around Y-axis (XZ plane)
    rotatedVec2 = rotatePoint(rotatedVec2, [0, 0, 1], angles.angleXY); // Rotate around Z-axis (XY plane)

    return [rotatedVec1, rotatedVec2];
}


