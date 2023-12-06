import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {type CellStyle, Graph, InternalEvent} from '@maxgraph/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  ngAfterViewInit() {
    const container = <HTMLElement>document.getElementById('graph-container');
    InternalEvent.disableContextMenu(container);

    const graph = new Graph(container);
    graph.setPanning(true); // Use mouse right button for panning
    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.batchUpdate(() => {
      const vertex01 = graph.insertVertex({
        parent,
        position: [10, 10],
        size: [100, 100],
        value: 'rectangle',
      });
      const vertex02 = graph.insertVertex({
        parent,
        position: [350, 90],
        size: [50, 50],
        style: {
          fillColor: 'orange',
          shape: 'ellipse',
          verticalAlign: 'top',
          verticalLabelPosition: 'bottom',
        },
        value: 'ellipse',
      });
      graph.insertEdge({
        parent,
        source: vertex01,
        target: vertex02,
        value: 'edge',
        style: {
          edgeStyle: 'orthogonalEdgeStyle',
          rounded: true,
        },
      });
    });
  }
}
