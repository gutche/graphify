import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import mx from '../../mxgraph';

@Component({
    selector: 'app-editor',
    standalone: true,
    imports: [SidebarComponent, MenuComponent],
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss',
})
export class EditorComponent {
    ngOnInit() {}

    ngAfterViewInit() {
        const container = document.getElementById('graph-container');
        const graph = new mx.mxGraph(container!);
        graph.setPanning(true);
        graph.setHtmlLabels(true);
        new mx.mxRubberband(graph);

        const xmlDocument = mx.mxUtils.parseXml(`
        <mxGraphModel dx="4997" dy="2347" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none" math="0" shadow="0">
          <root>
            <mxCell id="0" />
            <mxCell id="1" parent="0" />
            <mxCell id="2" value="" style="group" vertex="1" connectable="0" parent="1">
              <mxGeometry x="250" y="240" width="2250" height="1598" as="geometry" />
            </mxCell>
            <mxCell id="3" value="" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=none;strokeWidth=3;fillColor=#e8edf0;fontSize=60;fontColor=#2F5B7C;align=left;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry width="2250" height="1598" as="geometry" />
            </mxCell>
            <mxCell id="4" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Customer Relationships&lt;/font&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;What type of relationship does each of our Customer&lt;/div&gt;&lt;div&gt;Segments expect us to establish and maintain with them?&lt;/div&gt;&lt;div&gt;Which ones have we established?&lt;/div&gt;&lt;div&gt;How are they integrated with the rest of our business model?&lt;/div&gt;&lt;div&gt;How costly are they?&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Examples&lt;/b&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Personal assistance&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Dedicated Personal Assistance&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Self-Service&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Automated Services&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Communities&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Co-creation&lt;/font&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1330" y="188" width="420" height="450" as="geometry" />
            </mxCell>
            <mxCell id="5" value="&lt;font&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Key Partners&lt;/font&gt;&lt;br&gt;&lt;/font&gt;&lt;font style=&quot;font-size: 12px&quot;&gt;&lt;br style=&quot;font-size: 12px&quot;&gt;&lt;font style=&quot;font-size: 12px&quot;&gt;Who are our Key Partners?&lt;br style=&quot;font-size: 12px&quot;&gt;Who are our Key Suppliers?&lt;br style=&quot;font-size: 12px&quot;&gt;Which Key Resources are we acquiring from partners?&lt;br style=&quot;font-size: 12px&quot;&gt;&lt;/font&gt;&lt;br style=&quot;font-size: 12px&quot;&gt;&lt;/font&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Motivations for partnerships&lt;/b&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Optimization and economy&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Reduction of risk and uncertainty&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Acquisition of particular resources and activities&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 12px&quot;&gt;&lt;br style=&quot;font-size: 12px&quot;&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="70" y="188" width="420" height="900" as="geometry" />
            </mxCell>
            <mxCell id="6" value="&lt;font&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Key Activities&lt;/font&gt;&lt;br style=&quot;font-size: 12px&quot;&gt;&lt;/font&gt;&lt;font&gt;&lt;br style=&quot;font-size: 12px&quot;&gt;&lt;div&gt;What Key Activities do our Value Propositions require?&lt;/div&gt;&lt;div&gt;Our Distribution Channels?&lt;/div&gt;&lt;div&gt;Customer Relationships?&lt;/div&gt;&lt;div&gt;Revenue streams?&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;/font&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;div&gt;&lt;b&gt;Categories&lt;/b&gt;&lt;/div&gt;&lt;div&gt;Production&lt;/div&gt;&lt;div&gt;Problem Solving&lt;/div&gt;&lt;div&gt;Platform/Network&lt;/div&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="490" y="188" width="420" height="450" as="geometry" />
            </mxCell>
            <mxCell id="7" value="&lt;div&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Key Resources&lt;/font&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;What Key Resources do our Value Propositions require?&lt;/div&gt;&lt;div&gt;Our Distribution Channels? Customer Relationships?&lt;/div&gt;&lt;div&gt;Revenue Streams?&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Types of resources&lt;/b&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Physical&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Intellectual (brand patents, copyrights, data)&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Human&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Financial&lt;/font&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="490" y="638" width="420" height="450" as="geometry" />
            </mxCell>
            <mxCell id="8" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Value Propositions&lt;/font&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;What value do we deliver to the customer?&lt;/div&gt;&lt;div&gt;Which one of our customer’s problems are we helping to solve?&lt;/div&gt;&lt;div&gt;What bundles of products and services are we offering to each Customer Segment?&lt;/div&gt;&lt;div&gt;Which customer needs are we satisfying?&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Characteristics&lt;/b&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Newness&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Performance&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Customization&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;“Getting the Job Done”&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Design&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Brand/Status&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Price&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Cost Reduction&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Risk Reduction&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Accessibility&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Convenience/Usability&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;br&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="910" y="188" width="420" height="900" as="geometry" />
            </mxCell>
            <mxCell id="9" value="&lt;div&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Customer Segments&lt;/font&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;For whom are we creating value?&lt;/div&gt;&lt;div&gt;Who are our most important customers?&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Mass Market&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Niche Market&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Segmented&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Diversified&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Multi-sided Platform&lt;/font&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1750" y="188" width="420" height="900" as="geometry" />
            </mxCell>
            <mxCell id="10" value="&lt;div&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Channels&lt;/font&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Through which Channels do our Customer Segments&lt;/div&gt;&lt;div&gt;want to be reached?&lt;/div&gt;&lt;div&gt;How are we reaching them now?&lt;/div&gt;&lt;div&gt;How are our Channels integrated?&lt;/div&gt;&lt;div&gt;Which ones work best?&lt;/div&gt;&lt;div&gt;Which ones are most cost-efficient?&lt;/div&gt;&lt;div&gt;How are we integrating them with customer routines?&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Channel phases&lt;/b&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;1. Awareness&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&amp;nbsp; &amp;nbsp; How do we raise awareness about our company’s products and services?&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;2. Evaluation&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&amp;nbsp; &amp;nbsp; How do we help customers evaluate our organization’s Value Proposition?&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;3. Purchase&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&amp;nbsp; &amp;nbsp; How do we allow customers to purchase specific products and services?&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;4. Delivery&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&amp;nbsp; &amp;nbsp; How do we deliver a Value Proposition to customers?&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;5. After sales&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&amp;nbsp; &amp;nbsp; How do we provide post-purchase customer support?&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;br&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1330" y="638" width="420" height="450" as="geometry" />
            </mxCell>
            <mxCell id="11" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Cost Structure&lt;/font&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;What are the most important costs inherent in our business model?&lt;/div&gt;&lt;div&gt;Which Key Resources are most expensive?&lt;/div&gt;&lt;div&gt;Which Key Activities are most expensive?&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Is your business more&lt;/b&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Cost Driven (leanest cost structure, low price value proposition, maximum automation, extensive outsourcing)&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Value Driven ( focused on value creation, premium value proposition)&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;br&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Sample characteristics&lt;/b&gt;&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Fixed Costs (salaries, rents, utilities)&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Variable costs&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Economies of scale&lt;/font&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Economies of scope&lt;/font&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="70" y="1088" width="1050" height="330" as="geometry" />
            </mxCell>
            <mxCell id="12" value="&lt;div style=&quot;font-size: 26px&quot;&gt;&lt;font style=&quot;font-size: 26px&quot;&gt;Revenue Streams&lt;/font&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;For what value are our customers really willing to pay?&lt;/div&gt;&lt;div&gt;For what do they currently pay?&lt;/div&gt;&lt;div&gt;How are they currently paying?&lt;/div&gt;&lt;div&gt;How would they prefer to pay?&lt;/div&gt;&lt;div&gt;How much does each Revenue Stream contribute to overall revenues?&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;labelBackgroundColor=none;strokeColor=#e8edf0;strokeWidth=5;fillColor=#ffffff;fontSize=12;fontColor=#2F5B7C;align=left;verticalAlign=top;spacing=30;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1120" y="1088" width="1050" height="330" as="geometry" />
            </mxCell>
            <mxCell id="13" value="The Business Model Canvas&lt;br&gt;" style="text;html=1;resizable=1;points=[];autosize=1;align=left;verticalAlign=top;spacingTop=-4;fontSize=60;fontColor=#2F5B7C;movable=1;rotatable=1;deletable=1;fillColor=#ffffff;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="70" y="78" width="780" height="70" as="geometry" />
            </mxCell>
            <mxCell id="17" value="&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Dynamic pricing&lt;/b&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Negotiation( bargaining)&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Yield Management&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Real-time-Market&lt;/div&gt;" style="text;html=1;resizable=1;points=[];autosize=1;align=left;verticalAlign=top;spacingTop=-4;fontSize=10;fontColor=#2F5B7C;movable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1474.5" y="1254" width="120" height="50" as="geometry" />
            </mxCell>
            <mxCell id="18" value="&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Fixed pricing&lt;/b&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;List Price&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Product feature dependent&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Customer segment dependent&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Volume dependent&lt;/div&gt;" style="text;html=1;resizable=1;points=[];autosize=1;align=left;verticalAlign=top;spacingTop=-4;fontSize=10;fontColor=#2F5B7C;movable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1295.5" y="1254" width="150" height="60" as="geometry" />
            </mxCell>
            <mxCell id="19" value="&lt;div style=&quot;font-size: 10px&quot;&gt;&lt;b&gt;Types&lt;/b&gt;&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Asset sale&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Usage fee&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Subscription Fees&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Lending/Renting/Leasing&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Licensing&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Brokerage fees&lt;/div&gt;&lt;div style=&quot;font-size: 10px&quot;&gt;Advertising&lt;/div&gt;" style="text;html=1;resizable=1;points=[];autosize=1;align=left;verticalAlign=top;spacingTop=-4;fontSize=10;fontColor=#2F5B7C;movable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1150" y="1254" width="130" height="100" as="geometry" />
            </mxCell>
            
             <mxCell id="28" value="www.businessmodelgeneration.com" style="text;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="110" y="1448" width="360" height="26" as="geometry" />
            </mxCell>
            <mxCell id="29" value="This work is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported License. &#xa;To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ &#xa;or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA." style="text;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;locked=0;connectable=1;" vertex="1" parent="2">
              <mxGeometry x="1413.5" y="1445.5" width="740" height="57" as="geometry" />
            </mxCell>
          </root>
        </mxGraphModel>`);

        const codec = new mx.mxCodec(xmlDocument);
        codec.decode(xmlDocument.documentElement, graph.getModel());
        graph.getModel().beginUpdate();
        const parent = graph.getDefaultParent();
        try {
            // Add a cell (in this case, a rectangle)
            const vertex = graph.insertVertex(
                parent,
                null,
                'New Cell',
                400,
                650,
                200,
                200
            );
        } finally {
            // End the transaction
            graph.getModel().endUpdate();
        }
        /* const model = codec.encode(graph.getModel());
        const modelXml = mx.mxUtils.getXml(model);
        const blob = new Blob([modelXml], { type: 'application/xml' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'example.xml';

        // Append the link to the document
        document.body.appendChild(downloadLink);

        // Trigger a click on the link to start the download
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink); */
    }
}
