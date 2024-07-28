class Plane
{
    constructor(normal, point)
    {
        this.normal = this.normalize(normal);
        this.point = point;
        this.basis = this.calculateBasis();
    }

    normalize(vector)
    {
        const magnitude = Math.sqrt(vector[0] ** 2 + vector[1] ** 2 + vector[2] ** 2);
        return [
            vector[0] / magnitude,
            vector[1] / magnitude,
            vector[2] / magnitude
        ];
    }

    calculateBasis()
    {
        let u = [1, 0, 0];
        if (Math.abs(this.normal[0]) > 0.9)
        {
            u = [0, 1, 0];
        }
        const v = this.crossProduct(this.normal, u);
        const w = this.crossProduct(this.normal, v);
        return { u: this.normalize(v), v: this.normalize(w) };
    }

    crossProduct(a, b)
    {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }

    dotProduct(a, b)
    {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    to2D(point3D)
    {
        const diff = [
            point3D[0] - this.point[0],
            point3D[1] - this.point[1],
            point3D[2] - this.point[2]
        ];
        return [
            this.dotProduct(diff, this.basis.u),
            this.dotProduct(diff, this.basis.v)
        ];
    }

    to3D(point2D)
    {
        return [
            this.point[0] + point2D[0] * this.basis.u[0] + point2D[1] * this.basis.v[0],
            this.point[1] + point2D[0] * this.basis.u[1] + point2D[1] * this.basis.v[1],
            this.point[2] + point2D[0] * this.basis.u[2] + point2D[1] * this.basis.v[2]
        ];
    }
    
    circleTangent (circleX, circleY, radius, pointX, pointY, counter = false) 
	{
		const dx = pointX - circleX;
		const dy = pointY - circleY;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const angle = Math.atan2(dy, dx);
		const theta = Math.acos(radius / dist);

		if (!counter)
		{
			return angle - theta;
		}
		else
		{
			return angle + theta;
		}
	}
    sphereToCircle(center, radius)
    {
        // Calculate the distance from the center to the plane
		const diff = [
			center[0] - this.point[0],
			center[1] - this.point[1],
			center[2] - this.point[2]
		];
		const distance = Math.abs(this.dotProduct(diff, this.normal));

		// Calculate the projected radius of the circle
		const circleRadius = Math.sqrt(Math.max(0, radius ** 2 - distance ** 2));

		// Project the center of the sphere onto the plane
		const center2D = this.to2D(center);

		return { center: center2D, radius: circleRadius };
    }
}
