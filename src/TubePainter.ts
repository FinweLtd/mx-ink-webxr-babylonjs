// Ported from Three.js example https://github.com/mrdoob/three.js/blob/3716f3ea7ce57c191d42769936da3355ae2c6908/examples/jsm/misc/TubePainter.js

import { Mesh, Vector3, Matrix, Color3, Scene, VertexBuffer, StandardMaterial } from "@babylonjs/core";

class TubePainter {

    private BUFFER_SIZE: number = 1000000 * 3;

    private positions: Float32Array;
    private normals: Float32Array;
    // private colors: Float32Array;

    private mesh: Mesh;
    private size = 1;
    private count = 0;
    private sides = 5;

    private vector1: Vector3 = new Vector3();
    private vector2: Vector3 = new Vector3();
    private vector3: Vector3 = new Vector3();
    private vector4: Vector3 = new Vector3();

    private color: Color3 = new Color3(1, 1, 1);

    private point1: Vector3 = new Vector3();
    private point2: Vector3 = new Vector3();

    private matrix1: Matrix = Matrix.Identity();
    private matrix2: Matrix = Matrix.Identity();

    constructor(private scene: Scene) {

        this.positions = new Float32Array(this.BUFFER_SIZE);
        this.normals = new Float32Array(this.BUFFER_SIZE);
        // this.colors = new Float32Array(this.BUFFER_SIZE);

        // Create the mesh
        this.mesh = new Mesh("TubePainterMesh", this.scene);

        // Initialize mesh with empty buffers
        this.mesh.setVerticesData(VertexBuffer.PositionKind, this.positions, true);
        this.mesh.setVerticesData(VertexBuffer.NormalKind, this.normals, true);
        // this.mesh.setVerticesData(VertexBuffer.ColorKind, this.colors, true);

        // Create material
        const material = new StandardMaterial("TubePainterMaterial", this.scene);
        // material.diffuseColor = new Color3(1, 0, 0);
        // material.specularColor = new Color3(1, 0, 0);
        material.emissiveColor = new Color3(1, 0, 0);
        // material.ambientColor = new Color3(1, 0, 0);
        material.disableLighting = true;
        material.backFaceCulling = true;
        material.forceDepthWrite = true;
        this.mesh.alwaysSelectAsActiveMesh = true;

        this.mesh.material = material;

        // this.paintCircle(new Vector3(0, 0, 0), 1);
    }

    public reset(): void {
        this.count = 0;
        this.mesh.updateVerticesData(VertexBuffer.PositionKind, [], false);
        this.mesh.updateVerticesData(VertexBuffer.NormalKind, [], false);
        this.mesh.setIndices([]);
    }

    // For debugging purposes
    public paintCircle(center: Vector3, radius: number, segments = 36): void {
        console.log("paintCircle", center, radius, segments);
        const angleStep = (Math.PI * 2) / segments;

        this.moveTo(new Vector3(center.x + radius, center.y, center.z));

        for (let i = 1; i <= segments; i++) {
            const angle = angleStep * i;
            const x = center.x + Math.cos(angle) * radius;
            const y = center.y + Math.sin(angle) * radius;
            this.lineTo(new Vector3(x, y, center.z));
        }

        this.update();
    }

    /* AI: "The getPoints function generates an array of Vector3 points that form a circle in the X-Y plane. 
    It calculates 10 evenly spaced points around the circle's circumference using sine and cosine functions. 
    The radius of the circle is 0.01 * size, where size is the function's input parameter. 
    Each point is added to an array, which is then returned." */
    private getPoints(size: number): Vector3[] {
        const PI2 = Math.PI * 2;
        const array: Vector3[] = [];
        const radius = 0.01 * size;

        for (let i = 0; i < this.sides; i++) {
            const angle = (i / this.sides) * PI2;
            array.push(new Vector3(Math.sin(angle) * radius, Math.cos(angle) * radius, 0));
        }

        return array;
    }

    /* AI: "The stroke function creates the mesh data needed to render a tube segment between two positions, 
    position1 and position2. It calculates and updates the positions, normals, 
    and colors arrays with transformed vertices that form the geometry of the tube connecting these positions. */
    private stroke(position1: Vector3, position2: Vector3, matrix1: Matrix, matrix2: Matrix): void {

        if (Vector3.DistanceSquared(position1, position2) === 0) return;

        let count = this.count;

        const points = this.getPoints(this.size);

        for (let i = 0, il = points.length; i < il; i++) {

            const vertex1 = points[i];
            const vertex2 = points[(i + 1) % il];

            // Positions
            this.vector1 = Vector3.TransformCoordinates(vertex1, matrix2).add(position2);
            this.vector2 = Vector3.TransformCoordinates(vertex2, matrix2).add(position2);
            this.vector3 = Vector3.TransformCoordinates(vertex2, matrix1).add(position1);
            this.vector4 = Vector3.TransformCoordinates(vertex1, matrix1).add(position1);

            this.positions.set(this.vector1.asArray(), (count + 0) * 3);
            this.positions.set(this.vector2.asArray(), (count + 1) * 3);
            this.positions.set(this.vector4.asArray(), (count + 2) * 3);

            this.positions.set(this.vector2.asArray(), (count + 3) * 3);
            this.positions.set(this.vector3.asArray(), (count + 4) * 3);
            this.positions.set(this.vector4.asArray(), (count + 5) * 3);

            // Normals
            this.vector1 = Vector3.TransformNormal(vertex1, matrix2).normalize();
            this.vector2 = Vector3.TransformNormal(vertex2, matrix2).normalize();
            this.vector3 = Vector3.TransformNormal(vertex2, matrix1).normalize();
            this.vector4 = Vector3.TransformNormal(vertex1, matrix1).normalize();

            this.normals.set(this.vector1.asArray(), (count + 0) * 3);
            this.normals.set(this.vector2.asArray(), (count + 1) * 3);
            this.normals.set(this.vector4.asArray(), (count + 2) * 3);

            this.normals.set(this.vector2.asArray(), (count + 3) * 3);
            this.normals.set(this.vector3.asArray(), (count + 4) * 3);
            this.normals.set(this.vector4.asArray(), (count + 5) * 3);

            // Colors
            // const colorArray = [this.color.r, this.color.g, this.color.b];

            // this.colors.set(colorArray, (count + 0) * 3);
            // this.colors.set(colorArray, (count + 1) * 3);
            // this.colors.set(colorArray, (count + 2) * 3);

            // this.colors.set(colorArray, (count + 3) * 3);
            // this.colors.set(colorArray, (count + 4) * 3);
            // this.colors.set(colorArray, (count + 5) * 3);

            count += 6;
        }

        this.count = count;
    }

    public moveTo(position: Vector3): void {
        this.point1.copyFrom(position);
        this.point2.copyFrom(position);
        this.matrix1 = Matrix.Identity();
        this.matrix2 = Matrix.Identity();
    }

    public lineTo(position: Vector3): void {
        this.point1.copyFrom(position);

        // Calculate the direction vector
        const direction = this.point1.subtract(this.point2).normalize();

        // Use a default up vector
        let up = Vector3.Up();

        // If the direction is parallel to the up vector, choose a different up vector
        if (Math.abs(Vector3.Dot(direction, up)) > 0.999) {
            up = Vector3.Right();
        }

        // Compute the right and adjusted up vectors
        const right = Vector3.Cross(up, direction).normalize();
        up = Vector3.Cross(direction, right).normalize();

        // Create a rotation matrix from the directional axes
        Matrix.FromXYZAxesToRef(right, up, direction, this.matrix1);
        
        // Proceed with drawing the stroke
        this.stroke(this.point1, this.point2, this.matrix1, this.matrix2);

        // Update the previous point and matrix
        this.point2.copyFrom(this.point1);
        this.matrix2.copyFrom(this.matrix1);
    }

    public setSize(value: number): void {
        this.size = value;
    }

    public update(): void {
        // Update the vertex buffers
        if (this.count === 0) return;

        const positions = this.positions.subarray(0, this.count * 3);
        const normals = this.normals.subarray(0, this.count * 3);
        // const colors = this.colors.subarray(0, this.count * 3);

        this.mesh.updateVerticesData(VertexBuffer.PositionKind, positions, false);
        this.mesh.updateVerticesData(VertexBuffer.NormalKind, normals, false);
        // this.mesh.updateVerticesData(VertexBuffer.ColorKind, colors, false);

        // Update indices
        const indices = [];
        for (let i = 0; i < this.count; i++) {
            indices.push(i);
        }
        this.mesh.setIndices(indices);
    }

    public getMesh(): Mesh {
        return this.mesh;
    }
}

export { TubePainter };